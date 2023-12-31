import React from "react";

const CountriesField = ({ value, handleChange }) => {
  return (
    <div>
      Search countries: <input value={value} onChange={handleChange} />
    </div>
  );
};

export default CountriesField;
