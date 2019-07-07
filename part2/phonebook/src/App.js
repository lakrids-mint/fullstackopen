import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import PersonForm from "./components/PersonForm";
import PersonShow from "./components/PersonShow";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="error">{message}</div>;
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  //fetch from db
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
      .catch(e => console.log(e));
  }, []);

  //helper function - checks if names exists
  const isDuplicate = item => {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name.toLowerCase() === item.toLowerCase()) {
        return true;
      }
    }
  };

  //Add person to db
  const addPerson = e => {
    e.preventDefault();
    setNewNumber(e.target.phone);
    setNewName(e.target.name);
    const personObject = {
      name: newName,
      number: newNumber
    };
    if (isDuplicate(newName)) {
      setErrorMessage(`${newName} is already added to phonebook`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          const newPerson = {
            name: returnedPerson.name,
            number: returnedPerson.number
          };
          setPersons(persons.concat(newPerson));
          setErrorMessage(`${newName} has been added to phonebook`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setNewName("");
          setNewNumber("");
        })
        .catch(e => console.log(e));
    }
  };
  //delete from db
  const deletePerson = id => {
    //TODO: name person
    const result = window.confirm(
      `Are you sure you want to delete this person?`
    );
    if (result) {
      personService.remove(id).then(res => {
        setPersons(persons.filter(person => person.id !== id));
      });
    }
  };
  const rows = () =>
    persons.map(person => (
      <PersonShow
        key={person.id}
        id={person.id}
        name={person.name}
        number={person.number}
        deletePerson={deletePerson}
      />
    ));
  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <h3>Add new contact</h3>
      <PersonForm
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      {rows()}
    </>
  );
};

export default App;
