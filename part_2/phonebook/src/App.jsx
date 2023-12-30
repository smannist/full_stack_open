import { useState } from "react";
import personService from "./services/persons";
import Persons from "./components/persons";
import PhonebookForm from "./components/phonebook_form";
import defaultPersons from "./hooks/persons";
import Notification, { notificationMessages } from "./components/notification";
import Error, { errorMessages } from "./components/error";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [persons, setPersons] = useState([]);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  defaultPersons(setPersons);

  const addPerson = (event) => {
    event.preventDefault();

    if (!newName || !newNumber) {
      alert("You must enter both name and a number");
      return;
    }

    const duplicatePersonObject = persons.find(
      (person) => person.name === newName
    );

    if (duplicatePersonObject) {
      const confirmation = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );

      if (confirmation) {
        updatePerson(duplicatePersonObject);
      }
    } else {
      const namesObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber,
      };
      personService.create(namesObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        resetForms();
        handleNotification(notificationMessages.add(newName));
      });
    }
  };

  const removePerson = async (id, name) => {
    const confirmation = window.confirm(
      `Do you want to remove ${name} from the phonebook?`
    );

    if (confirmation) {
      await personService.remove(id);
      personService.getAll().then((getPersons) => {
        setPersons(getPersons);
        handleNotification(notificationMessages.remove(name));
      });
    }
  };

  const updatePerson = (duplicatePersonObject) => {
    const updatePersonObject = {
      ...duplicatePersonObject,
      number: newNumber,
    };
    personService
      .update(duplicatePersonObject.id, updatePersonObject)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== duplicatePersonObject.id ? person : returnedPerson
          )
        );
        resetForms();
        handleNotification(
          notificationMessages.update(duplicatePersonObject.name)
        );
      })
      .catch((error) => {
        handleError(errorMessages.alreadyRemoved(duplicatePersonObject.name));
        personService.getAll().then((updatedPersons) => {
          setPersons(updatedPersons);
        });
      });
  };

  const resetForms = () => {
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

  const handleNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleError = (message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} />
      <Error message={error} />
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
