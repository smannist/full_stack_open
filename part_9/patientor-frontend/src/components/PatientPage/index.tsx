import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { Typography, Button } from "@mui/material";

import {
  PatientDetailedParams,
  Patient,
  PatientDetailedProps,
  Entry,
} from "../../types";

import patientService from "../../services/patients";

import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HospitalEntry from "./HospitalEntry";
import AddPatientEntryForm from "./AddPatientEntryForm";

const PatientDetailed = ({ diagnoses }: PatientDetailedProps) => {
  const [visible, setVisible] = useState(true);
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams<PatientDetailedParams>();

  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        try {
          const patientData = await patientService.getOne(id);
          setPatient(patientData);
        } catch (error) {
          console.log("An error occurred while fetching patient:", error);
        }
      };
      fetchPatient();
    }
  }, [id]);

  const isVisible = () => {
    setVisible(!visible);
  };

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

  const entryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "HealthCheck":
        return <HealthCheckEntry entry={entry} />;
      case "OccupationalHealthcare":
        return (
          <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />
        );
      case "Hospital":
        return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
      default:
        return null;
    }
  };

  if (patient) {
    const genderIcon = genderIconSelector(patient.gender);

    return (
      <div>
        <Typography variant="h4" style={{ marginTop: 20 }}>
          <strong>{patient.name}</strong> {genderIcon}
        </Typography>
        <Typography variant="subtitle1">Born: {patient.dateOfBirth}</Typography>
        <Typography variant="subtitle1">SSN: {patient.ssn}</Typography>
        <Typography variant="subtitle1">
          Occupation: {patient.occupation}
        </Typography>
        {visible && (
          <Button onClick={isVisible} variant="contained">
            Add entry
          </Button>
        )}
        {!visible && (
          <AddPatientEntryForm
            isVisible={isVisible}
            patient={patient}
            setPatient={setPatient}
          />
        )}
        <Typography variant="h6" style={{ marginTop: 20 }}>
          Entries
        </Typography>
        {patient.entries.map((entry) => (
          <div key={entry.id}>{entryDetails({ entry })}</div>
        ))}
      </div>
    );
  }

  return null;
};

export default PatientDetailed;
