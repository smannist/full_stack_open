import { v1 as uuid } from "uuid";

import patients from "../data/patients";
import { NonSensitivePatient, NewPatientEntry, Patient } from "../types";

const getNonSensitiveEntires = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id = uuid();

  const newPatientEntry = {
    id,
    ...entry,
  };

  patients.push(newPatientEntry);

  return newPatientEntry;
};

export default {
  getNonSensitiveEntires,
  addPatient,
};
