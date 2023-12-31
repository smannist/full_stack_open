import React from "react";
import Country from "./country";

const Countries = ({ countries, value }) => {
  const filteredCountries =
    value.length > 0
      ? countries.filter((country) =>
          country.name.common.toLowerCase().includes(value.toLowerCase())
        )
      : [];

  const countryAmount = filteredCountries.length;

  if (countryAmount > 10) {
    return <div>Too many matches, specify another filter.</div>;
  }

  if (countryAmount > 1) {
    return (
      <div>
        {filteredCountries.map((country) => (
          <div key={country.name.common}>{country.name.common}</div>
        ))}
      </div>
    );
  }

  if (countryAmount === 1) {
    return (
      <Country country={filteredCountries[0]}/>
    )
  }

};

export default Countries;
