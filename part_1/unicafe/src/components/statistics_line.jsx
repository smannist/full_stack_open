import React from "react";

const StatisticsLine = ({ text, value, suffix }) => {
  const roundedValue = Number.isInteger(value) ? value : value.toFixed(1);

  return (
    <tr>
      <td>
        {text}
      </td>
      <td>
        {roundedValue}
      </td>
      <td>
        {suffix}
      </td>
    </tr>
  );
}

export default StatisticsLine;
