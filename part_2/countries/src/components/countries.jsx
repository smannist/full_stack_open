import React from "react";
import Country from "./country";

const Countries = ({ countries, value, onShow }) => {
  const filteredCountries =
    value.length > 0
      ? countries.filter((country) =>
          country.name.common.toLowerCase().includes(value.toLowerCase())
        )
      : [];

  const countryAmount = filteredCountries.length;

  if (countryAmount === 1) {
    return (
      <Country country={filteredCountries[0]}/>
    )
  }

  if (countryAmount > 10) {
    return <div>Too many matches, specify another filter.</div>;
  }

  return (
    <div className="countries">
      {filteredCountries.map((country) => (
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={event => onShow(event, country.name.common)}>Show</button>
        </div>
      ))}
    </div>
  );

};

export default Countries;
