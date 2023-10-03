import React from "react";

const Statistics = ({ valueText1, valueText2, valueText3, value1, value2, value3 }) => (
  <p>
    {valueText1} {value1}
    <br></br>{valueText2} {value2}
    <br></br>{valueText3} {value3}
  </p>
)

export default Statistics;
