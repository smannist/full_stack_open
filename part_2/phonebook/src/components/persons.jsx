import React from "react";
import Person from "./person";

const Persons = ({ persons, filter, remove }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {filteredPersons.map((person) => (
        <Person key={person.id} name={person.name} number={person.number} id={person.id} remove={remove} />
      ))}
    </div>
  );
};

export default Persons;