import React from "react";

const Total = ({ parts }) => {
  let startingValue = 0;

  const totalExercises = parts.reduce(
    (total, part) => total + part.exercises,
    0
  );

  return <p>total of {totalExercises} exercises</p>;
};

export default Total;
