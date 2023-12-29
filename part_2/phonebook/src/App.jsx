import { useState } from "react";
import personService from "./services/persons"
import Persons from "./components/persons";
import PhonebookForm from "./components/phonebook_form";
import defaultPersons from "./hooks/persons";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [persons, setPersons] = useState([]);

  defaultPersons(setPersons)

  const addPerson = (event) => {
    event.preventDefault();
    const duplicateName = persons.some((person) => person.name === newName);

    if (!newName || !newNumber) {
      alert("You must enter both name and a number");
      return;
    }

    if (duplicateName) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const namesObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

    personService
    .create(namesObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName("")
      setNewNumber("")
    })
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleChangeFilter = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <PhonebookForm
        name={newName}
        number={newNumber}
        filter={newFilter}
        filterChange={handleChangeFilter}
        nameChange={handleNameChange}
        numberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} />
    </div>
  );
};

export default App;
