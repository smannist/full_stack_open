import { useState } from "react";
import Person from "./components/person";

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
    console.log(event.target.value);
    setNewFilter(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <h4>Filter name</h4>
        <div>
          Name:
          <input value={newFilter} onChange={handleChangeFilter}/>
        </div>
        <h4>Add new</h4>
        <div>
          Name:
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number:
          <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(newFilter.toLowerCase())
        )
        .map((person) => (
          <Person key={person.id} name={person.name} number={person.number} />
        ))}
    </div>
    </div>
  );
};

export default App;
