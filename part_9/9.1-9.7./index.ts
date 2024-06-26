import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(Number(height), Number(weight));

  return res.json({ weight: weight, height: height, bmi: bmi });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).send({ error: "parameters missing" });
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some(isNaN) ||
    isNaN(Number(target))
  ) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const result = calculateExercises(
    Number(target),
    daily_exercises.map((hour: number) => Number(hour))
  );

  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(express.json());
