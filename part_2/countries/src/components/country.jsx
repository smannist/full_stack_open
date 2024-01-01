import React from "react";
import Weather from "./weather";

const Country = ({ country }) => {

  return (
    <div key={country.name.common}>
      <h2>{country.name.common}</h2>
      <div>
        <img
          className="country-img"
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
        />
      </div>
      <p>
        <b>Capital:</b> {country.capital}
      </p>
      <p>
        <b>Total area:</b> {country.area} km²
      </p>
      <h4>Official languages</h4>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <Weather
        lat={country.capitalInfo.latlng[0]}
        lon={country.capitalInfo.latlng[1]}
        capital={country.capital}
      />
    </div>
  );

};

export default Country;
