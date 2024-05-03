import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { Typography } from "@mui/material";

import { PatientDetailedProps, Patient } from "../types";

import patientService from "../services/patients";

const PatientDetailed = () => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const { id } = useParams<PatientDetailedProps>();

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
                    <li key={index}>{diagnosisCode}</li>
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

  return (
    <div>
      <br></br>
      <Typography variant="h4">Patient not found.</Typography>
    </div>
  );
};

export default PatientDetailed;
