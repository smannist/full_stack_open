import { useState } from "react";
import Persons from "./components/persons";
import FilterField from "./components/filter_field";
import PersonField from "./components/person_field";
import PhonebookForm from "./components/phonebook_form";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const [persons, setPersons] = useState([
    { id: 0, name: "Arto Hellas", number: "040-123456" },
    { id: 1, name: "Ada Lovelace", number: "39-44-5323523" },
    { id: 2, name: "Dan Abramov", number: "12-43-234345" },
    { id: 3, name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

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

    setPersons(persons.concat(namesObject));
    setNewName("");
    setNewNumber("");
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
