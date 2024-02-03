interface ExercisePlan {
  target: number;
  hours: number[];
}

const parseArguments = (args: string[]): ExercisePlan => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (isNaN(Number(args[2]))) {
    throw new Error(`Found invalid target value: ${args[2]}`);
  }

  const target = Number(args[2])

  const hours = args.slice(3).map((arg) => {
    if (isNaN(Number(arg))) {
      throw new Error(`Found invalid training hour value: ${arg}`);
    }
    return Number(arg);
  });

  return {
    target,
    hours,
  };
};

export default parseArguments;
