import {
  NewPatientEntry,
  Gender,
  Entry,
  NewEntries,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HealthCheckRating,
  Diagnosis,
  BaseWithoutID,
  Discharge,
  SickLeave,
} from "./types";

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDOB(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export const toNewPatientEntries = (object: unknown): NewEntries => {
  if (!object || typeof object !== "object" || !("type" in object)) {
    throw new Error("Incorrect or missing entry");
  }

  if ("description" in object && "date" in object && "specialist" in object) {
    const baseEntry: BaseWithoutID = {
      description: parseString(object.description, "description"),
      date: parseDate(object.date, "date"),
      specialist: parseString(object.specialist, "specialist"),
    };

    if ("diagnosisCodes" in object) {
      baseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
    }

    switch (object.type) {
      case "Hospital":
        if (!("discharge" in object)) {
          throw new Error("Missing discharge details for Hospital entry");
        }
        return {
          ...baseEntry,
          type: "Hospital",
          discharge: parseDischarge(object.discharge),
        };
      case "OccupationalHealthcare":
        if (!("employerName" in object)) {
          throw new Error("Missing employerName details for Hospital entry");
        }
        if ("sickLeave" in object) {
          return {
            ...baseEntry,
            type: "OccupationalHealthcare",
            employerName: parseString(object.employerName, "employerName"),
            sickLeave: parseSickLeave(object.sickLeave),
          };
        } else {
          return {
            ...baseEntry,
            type: "OccupationalHealthcare",
            employerName: parseString(object.employerName, "employerName"),
          };
        }
      case "HealthCheck":
        if (!("healthCheckRating" in object)) {
          throw new Error("Missing health check rating for HealthCheck entry");
        }
        return {
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
      default:
        throw new Error("Invalid entry type");
    }
  } else {
    throw new Error("Incorrect data: some fields are missing");
  }
};

const parseString = (value: unknown, fieldName: string): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing ${fieldName}`);
  }

  return value;
};

const parseDate = (date: unknown, fieldName: string): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing ${fieldName}`);
  }

  return date;
};

const parseDischarge = (discharge: unknown): HospitalEntry["discharge"] => {
  if (!isDischarge(discharge)) {
    throw new Error("Incorrect or missing discharge");
  }

  return {
    date: parseDate(discharge.date, "discharge date"),
    criteria: parseString(discharge.criteria, "discharge criteria"),
  };
};

const parseSickLeave = (
  sickLeave: unknown
): OccupationalHealthcareEntry["sickLeave"] | undefined => {
  if (!isSickLeave(sickLeave)) {
    return undefined;
  }

  return {
    startDate: parseDate(sickLeave.startDate, "sick leave start date"),
    endDate: parseDate(sickLeave.endDate, "sick leave end date"),
  };
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!Object.values(HealthCheckRating).includes(rating as HealthCheckRating)) {
    throw new Error("Incorrect or missing health check rating");
  }

  return rating as HealthCheckRating;
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnosis["code"]> => {
  if (!Array.isArray(codes)) {
    return [];
  }

  if (!codes.every((code) => typeof code === "string")) {
    throw new Error("Incorrect diagnosis codes");
  }

  return codes as Array<Diagnosis["code"]>;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

const parseDOB = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing date of birth");
  }

  return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn) || !isSSN(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }

  return gender;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries)) {
    throw new Error("Entries should be an array");
  }

  if (
    !entries.every(
      (entry) =>
        typeof entry === "object" &&
        entry !== null &&
        typeof entry.type === "string"
    )
  ) {
    throw new Error("Incorrect or missing entries");
  }

  const typedEntries = entries as Entry[];

  if (!isCorrectEntryType(typedEntries)) {
    throw new Error("Invalid entry types");
  }

  return typedEntries;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isSSN = (ssn: string): boolean => {
  const ssnPattern = /^\d{6}-[0-9A-Z]{3,4}$/;

  return ssnPattern.test(ssn);
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const isDischarge = (object: unknown): object is Discharge => {
  if (object !== null && typeof object === "object") {
    const obj = object as { date: unknown; criteria: unknown };
    return typeof obj.date === "string" && typeof obj.criteria === "string";
  }
  return false;
};

const isSickLeave = (object: unknown): object is SickLeave => {
  if (object !== null && typeof object === "object") {
    const obj = object as { startDate: unknown; endDate: unknown };
    return typeof obj.startDate === "string" && typeof obj.endDate === "string";
  }
  return false;
};

const isCorrectEntryType = (entries: Entry[]): boolean => {
  return entries.every((entry: Entry) => {
    switch (entry.type) {
      case "Hospital":
        return hasValidHospitalEntryFields(entry);
      case "OccupationalHealthcare":
        return hasValidOccupationalHealthcareEntryFields(entry);
      case "HealthCheck":
        return hasValidHealthCheckEntryFields(entry);
      default:
        return false;
    }
  });
};

const hasValidHospitalEntryFields = (entry: HospitalEntry): boolean => {
  return (
    entry.type === "Hospital" &&
    "discharge" in entry &&
    typeof entry.discharge === "object" &&
    "date" in entry.discharge &&
    typeof entry.discharge.date === "string" &&
    "criteria" in entry.discharge &&
    typeof entry.discharge.criteria === "string"
  );
};

const hasValidOccupationalHealthcareEntryFields = (
  entry: OccupationalHealthcareEntry
): boolean => {
  return (
    entry.type === "OccupationalHealthcare" &&
    "employerName" in entry &&
    typeof entry.employerName === "string" &&
    (!entry.sickLeave ||
      ("startDate" in entry.sickLeave &&
        typeof entry.sickLeave.startDate === "string" &&
        "endDate" in entry.sickLeave &&
        typeof entry.sickLeave.endDate === "string"))
  );
};

const hasValidHealthCheckEntryFields = (entry: HealthCheckEntry): boolean => {
  return (
    entry.type === "HealthCheck" &&
    "healthCheckRating" in entry &&
    typeof entry.healthCheckRating === "number" &&
    Object.values(HealthCheckRating).includes(entry.healthCheckRating)
  );
};
