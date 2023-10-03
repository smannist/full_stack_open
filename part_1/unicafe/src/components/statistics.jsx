import React from "react";

const Statistics = ({ valueText1, valueText2, valueText3, value1, value2, value3 }) => {
  const total = value1 + value2 + value3;
  const average = total === 0 ? 0 : (value1 * 1 + value2 * 0 + value3 * -1) / total;
  const positivePercentage = total === 0 ? 0 : (value1 / total) * 100;

  return (
    <div>
      <p>
        {valueText1}: {value1}
        <br />
        {valueText2}: {value2}
        <br />
        {valueText3}: {value3}
        <br />
        Total: {total}
        <br />
        Average: {average}
        <br />
        Positive: {positivePercentage} %
      </p>
    </div>
  );

};

export default Statistics;
