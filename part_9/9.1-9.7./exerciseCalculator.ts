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
  hours: Array<number>,
  target: number
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

const hours = [3, 0, 2, 4.5, 0, 3, 1];
const target = 2;

console.log(calculateExercises(hours, target));
