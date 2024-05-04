import { Diagnosis } from "./types";

export const getDiagnosisName = (
  code: string,
  diagnoses: Diagnosis[]
): string => {
  const diagnosis = diagnoses.find((d) => d.code === code);
  return diagnosis ? diagnosis.name : code;
};
