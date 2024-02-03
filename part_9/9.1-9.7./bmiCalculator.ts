import parseArguments from "./utils/bmiParser";

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;

  if (bmi < 16) {
    return "Underweight (Severe thinness)";
  } else if (bmi <= 16.9) {
    return "Underweight (Moderate thinness)";
  } else if (bmi <= 18.4) {
    return "Underweight (Mild thinness)";
  } else if (bmi <= 24.9) {
    return "Normal (Healthy weight)";
  } else if (bmi <= 29.9) {
    return "Overweight (Pre-obese)";
  } else if (bmi <= 34.9) {
    return "Obese (Class I)";
  } else if (bmi <= 39.9) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }

};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMsg = "An error happened during parsing.";

  if (error instanceof Error) {
    errorMsg += " Error: " + error.message + ".";
  }

  console.log(errorMsg);
}
