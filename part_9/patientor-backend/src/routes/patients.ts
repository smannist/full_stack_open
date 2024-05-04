/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientService from "../services/patientService";
import { toNewPatientEntry, toNewPatientEntries } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntires());
});

router.get("/:id", (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({ error: "Patient not found" });
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMsg = "Something went wrong!";

    if (error instanceof Error) {
      errorMsg += " Error: " + error.message;
    }

    res.status(404).send(errorMsg);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewPatientEntries(req.body);
    const addedEntry = patientService.addEntry(req.params.id, newEntry);
    res.status(201).json(addedEntry);
  } catch (error) {
    let errorMsg = "Failed to add entry!";

    if (error instanceof Error) {
      errorMsg += " Error: " + error.message;
    }

    res.status(400).send(errorMsg);
  }
});

export default router;
