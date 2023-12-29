import { useState } from "react";
import personService from "./services/persons";
import Persons from "./components/persons";
import PhonebookForm from "./components/phonebook_form";
import defaultPersons from "./hooks/persons";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [persons, setPersons] = useState([]);

  defaultPersons(setPersons);

  const addPerson = (event) => {
    event.preventDefault();

    if (!newName || !newNumber) {
      alert("You must enter both name and a number");
      return;
    }

    const duplicatePersonObject = persons.find(person => person.name === newName)

    if (duplicatePersonObject) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const updatePersonObject =  {...duplicatePersonObject, number: newNumber }

        personService
        .update(duplicatePersonObject.id, updatePersonObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== duplicatePersonObject.id ? person : returnedPerson))
          setNewName("");
          setNewNumber("");
        })

      }
      alert(`${newName} updated successfully`)
      return;
    }

    const namesObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

    personService
    .create(namesObject)
    .then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });

  };

  const removePerson = async (id, name) => {
    if (window.confirm(`Do you want to remove ${name} from the phonebook?`)) {
      await personService.remove(id);

      personService
      .getAll()
      .then((getPersons) => {
        setPersons(getPersons);
      });

      alert(`${name} removed successfully`)
    }
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
      <Persons persons={persons} filter={newFilter} remove={removePerson} />
    </div>
  );
};

export default App;
