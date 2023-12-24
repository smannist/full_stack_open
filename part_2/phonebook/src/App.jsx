import { useState } from "react";
import Person from "./components/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const duplicateName = persons.some((person) => person.name === newName);

    if (duplicateName) {
      alert(`${newName} is already added to phonebook`);
      return
    }

    const namesObject = {
      id: persons.length + 1,
      name: newName,
    };

    setPersons(persons.concat(namesObject));
    setNewName("");
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    console.log(persons);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <Person key={person.id} name={person.name} />
        ))}
      </div>
    </div>
  );
};

export default App;
