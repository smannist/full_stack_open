interface Physique {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): Physique => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (Number(args[2]) <= 0 || Number(args[3]) <= 0)
    throw new Error("Weight and Height cannot be less than or equal to zero");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export default parseArguments;
