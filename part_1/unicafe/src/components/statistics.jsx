import React from "react";
import StatisticsLine from "./statistics_line";

const Statistics = ({
  valueText1,
  valueText2,
  valueText3,
  valueText4,
  valueText5,
  valueText6,
  value1,
  value2,
  value3,
  total,
  average,
  positive,
  suffix
}) => {

  const totalFeedback = value1 + value2 + value3;

  if (totalFeedback > 0) {
    return (
      <div>
        <StatisticsLine
          text={valueText1}
          value={value1}
        />

        <StatisticsLine
          text={valueText2}
          value={value2}
        />

        <StatisticsLine
          text={valueText3}
          value={value3}
        />

        <StatisticsLine
          text={valueText4}
          value={total}
        />

        <StatisticsLine
          text={valueText5}
          value={average}
        />

        <StatisticsLine
          text={valueText6}
          value={positive}
          suffix={suffix}
        />

      </div>
    );
  }

  return (
    <p>
      There is not any feedback yet
    </p>
  )

};

export default Statistics;
