import React from "react";

const StatisticsLine = ({ text, value, suffix }) => {
  return (
    <p>
      {text} {value} {suffix}
    </p>
  );
}

export default StatisticsLine;
