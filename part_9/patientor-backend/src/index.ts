import express from "express";
import cors from "cors";

import { PORT } from "../config";

import diagnoseRouter from "./routes/diagnoses";
import testRouter from "./routes/test";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/ping", testRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
