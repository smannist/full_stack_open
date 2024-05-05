import { useState } from "react";
import axios from "axios";

import { TextField, Typography, Button, Alert } from "@mui/material";
import { useParams } from "react-router-dom";

import {
  HealthCheckRating,
  HealthCheckEntryFormValues,
  Patient,
} from "../../types";

import patientService from "../../services/patients";

interface Props {
  isVisible: () => void;
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

const AddPatientEntryForm = ({ isVisible, patient, setPatient }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<
    HealthCheckRating | string
  >("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>("");

  const { id } = useParams<string>();

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleSpecialistChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSpecialist(event.target.value);
  };

  const handleHealthCheckRatingChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHealthCheckRating(Number(event.target.value));
  };

  const handleDiagnosisCodesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDiagnosisCodes(event.target.value);
  };

  const addEntry = async (values: HealthCheckEntryFormValues) => {
    if (id) {
      try {
        const newEntry = await patientService.createEntry(values, id);

        const updatedPatient = {
          ...patient,
          entries: [...patient.entries, newEntry],
        };

        setPatient(updatedPatient);
        resetFields();
        isVisible();
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            setErrorMessage(
              e.response.data.replace("Something went wrong. Error: ", "")
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          }
        }
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formValues: HealthCheckEntryFormValues = {
      description: description,
      date: date,
      specialist: specialist,
      healthCheckRating: healthCheckRating as HealthCheckRating,
      diagnosisCodes: diagnosisCodes.split(",").map((code) => code.trim()),
      type: "HealthCheck",
    };

    await addEntry(formValues);
  };

  const resetFields = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthCheckRating("");
    setDiagnosisCodes("");
  };

  return (
    <div className="patientEntryForm">
      <Typography variant="h6">New healthcheck entry</Typography>
      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <Alert style={{ margin: "1px" }} severity="error">
            {errorMessage}
          </Alert>
        )}
        <TextField
          fullWidth
          id="filled-required"
          label="Description"
          value={description}
          onChange={handleDescriptionChange}
          variant="standard"
        />
        <TextField
          fullWidth
          id="filled-required"
          label="Date"
          value={date}
          onChange={handleDateChange}
          variant="standard"
        />
        <TextField
          fullWidth
          id="filled-required"
          label="Specialist"
          value={specialist}
          onChange={handleSpecialistChange}
          variant="standard"
        />
        <TextField
          fullWidth
          id="filled-required"
          label="Healthcheck rating"
          value={healthCheckRating}
          onChange={handleHealthCheckRatingChange}
          variant="standard"
        />
        <TextField
          fullWidth
          id="filled-required"
          label="Diagnosis codes"
          margin="normal"
          value={diagnosisCodes}
          onChange={handleDiagnosisCodesChange}
          variant="standard"
        />
        <Button
          onClick={isVisible}
          type="button"
          className=".patientEntryFormButtonCancel"
          variant="contained"
          color="error"
        >
          Cancel
        </Button>
        <Button
          className="patientEntryFormButtonAdd"
          variant="contained"
          type="submit"
        >
          Add
        </Button>
      </form>
    </div>
  );
};

export default AddPatientEntryForm;
