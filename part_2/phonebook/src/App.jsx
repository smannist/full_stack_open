import { useState } from "react";
import personService from "./services/persons";
import Persons from "./components/persons";
import PhonebookForm from "./components/phonebook_form";
import defaultPersons from "./hooks/persons";
import Notification, { successMessages, failureMessages } from "./components/notification";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [persons, setPersons] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  defaultPersons(setPersons);

  const addPerson = (event) => {
    event.preventDefault();

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
      createPerson();
    }

  };

  const removePerson = async (id, name) => {
    const confirmation = window.confirm(
      `Do you want to remove ${name} from the phonebook?`
    );

    if (confirmation) {
      await personService.remove(id);
      personService
      .getAll()
      .then((getPersons) => {
        setPersons(getPersons);
        handleNotification(
        successMessages.remove(name), "success");
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
          successMessages.update(duplicatePersonObject.name),
          "success"
        );
      })
      .catch((error) => {
        console.log(error);
        handleNotification(
        failureMessages.alreadyRemoved(duplicatePersonObject.name), "failure");
        personService
          .getAll()
          .then((updatedPersons) => {
            setPersons(updatedPersons);
        });
      });
  };

  const createPerson = () => {
    const namesObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };
    personService
      .create(namesObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        resetForms();
        handleNotification(
        successMessages.add(newName), "success");
    })
      .catch(error => {
        handleNotification(
          failureMessages.mongoValidator(error), "failure");
      })
  }

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

  const handleNotification = (message, type) => {
    setNotificationMessage(message)
    setNotificationType(type);
    setTimeout(() => {
      setNotificationMessage(null);
      setNotificationType(null);
    }, 3000);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} type={notificationType} />
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
