export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type NewPatientEntry = Omit<Patient, "id">;
