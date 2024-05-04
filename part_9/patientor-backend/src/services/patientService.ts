import { v1 as uuid } from "uuid";

import patients from "../data/patients";

import {
  NonSensitivePatient,
  NewPatientEntry,
  Patient,
  Entry,
  NewEntries,
} from "../types";

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

const addEntry = (patientId: string, entry: NewEntries): Entry => {
  const newEntry: Entry = {
    ...entry,
    id: uuid(),
  };

  const patient = patients.find((p) => p.id === patientId);

  if (!patient) {
    throw new Error("Patient not found");
  }

  patient.entries.push(newEntry);

  return newEntry;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

export default {
  getNonSensitiveEntires,
  addPatient,
  getPatient,
  addEntry,
};
