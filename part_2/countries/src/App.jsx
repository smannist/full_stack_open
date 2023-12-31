import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CountriesField from "./components/fields/countries";
import Countries from "./components/countries";

const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
    .get(import.meta.env.VITE_COUNTRIES_API_URL)
    .then((response) => {
      setCountries(response.data);
    });
  }, []);

  const onShow = (event, country) => {
    event.preventDefault();
    setValue(country);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <h1>Country search</h1>
      <CountriesField
        value={value}
        handleChange={handleChange}
      />
      <Countries countries={countries} value={value} onShow={onShow}/>
    </div>
  );
};

export default App;
