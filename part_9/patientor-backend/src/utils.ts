import {
  NewPatientEntry,
  Gender,
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HealthCheckRating,
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
  if (!Array.isArray(entries) || !isCorrectEntryType(entries)) {
    throw new Error("Incorrect or missing entries");
  }

  return entries;
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

const isCorrectEntryType = (param: Entry[]): param is Entry[] => {
  return param.every((entry) => {
    switch (entry.type) {
      case "Hospital":
        return hasValidHospitalEntryFields(entry as HospitalEntry);
      case "OccupationalHealthcare":
        return hasValidOccupationalHealthcareEntryFields(
          entry as OccupationalHealthcareEntry
        );
      case "HealthCheck":
        return hasValidHealthCheckEntryFields(entry as HealthCheckEntry);
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
