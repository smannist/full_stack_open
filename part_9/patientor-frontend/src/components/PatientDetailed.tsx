import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { Typography } from "@mui/material";

import { PatientDetailedParams, Patient, PatientDetailedProps } from "../types";

import patientService from "../services/patients";

const PatientDetailed = ({ diagnoses }: PatientDetailedProps) => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const { id } = useParams<PatientDetailedParams>();

  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        try {
          const patientData = await patientService.getOne(id);
          setPatient(patientData);
        } catch (error) {
          console.log("An error occured while fetching patient:", error);
        }
      };
      fetchPatient();
    }
  }, [id]);

  const genderIconSelector = (gender: string) => {
    switch (gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      case "other":
        return <TransgenderIcon />;
      default:
        return null;
    }
  };

  const getDiagnosisName = (code: string): string => {
    const diagnosis = diagnoses.find(d => d.code === code);
    return diagnosis ? diagnosis.name : code;
  };

  if (patient) {
    const genderIcon = genderIconSelector(patient.gender);

    return (
      <div>
        <br></br>
        <Typography variant="h4">
          <strong>{patient.name}</strong> {genderIcon}
        </Typography>
        <Typography variant="subtitle1">
          Born: {patient.dateOfBirth}
        </Typography>
        <Typography variant="subtitle1">
          SSN: {patient.ssn}
        </Typography>
        <Typography variant="subtitle1">
          Occupation: {patient.occupation}
        </Typography>
        <br></br>
        <Typography variant="h6">
          Entries
        </Typography>
        {patient.entries.map((entry) => (
          <div key={entry.id}>
            <Typography variant="subtitle1">
              {entry.date} -- <i>{entry.description}</i>
            </Typography>
            {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
              <div>
                <Typography variant="subtitle1">
                <ul>
                  {entry.diagnosisCodes.map((diagnosisCode, index) => (
                    <li key={index}>{diagnosisCode} {getDiagnosisName(diagnosisCode)}</li>
                  ))}
                </ul>
                </Typography>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
};

export default PatientDetailed;
