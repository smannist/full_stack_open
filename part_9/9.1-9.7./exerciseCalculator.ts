import parseArguments from "./utils/exerciseParser";

interface ExerciseInfo {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  target: number,
  hours: number[],
): ExerciseInfo => {
  let rating;
  let ratingDescription;

  const periodLength = hours.length;
  const trainingDays = hours.filter((hour) => hour > 0).length;
  const average =
    hours.reduce((total, hours) => total + hours, 0) / hours.length;
  const success = average >= target;

  if (average >= target) {
    rating = 3;
    ratingDescription = "Excellent! Keep up the good work!";
  } else if (average >= target / 2) {
    rating = 2;
    ratingDescription = "Decent, but you can do better.";
  } else {
    rating = 1;
    ratingDescription = "Try harder!";
  }

  const ExerciseInfo = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };

  return ExerciseInfo;
};

try {
  const { target, hours } = parseArguments(process.argv);
  console.log(calculateExercises(target, hours));
} catch (error: unknown) {
  let errorMsg = "An error happened during parsing.";

  if (error instanceof Error) {
    errorMsg += " Error: " + error.message + ".";
  }

  console.log(errorMsg);
}
