import React, { useState, useEffect } from 'react';
import personService from './personService';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleAddPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      // If person exists, confirm if they want to replace the old number
      const confirmReplace = window.confirm(
        `${newName} is already added to the phonebook. Do you want to replace the old number with the new one?`
      );

      if (confirmReplace) {
        // Use PUT method to update the phone number
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService.update(existingPerson.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(person => 
              person.id === existingPerson.id ? response.data : person
            ));
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            console.error('There was an error updating the phone number!', error);
          });
      }
      return;
    }

    const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0;
    const newId = maxId + 1;

    const personObject = { name: newName, number: newNumber, id: newId };

    personService.create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data));
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        console.error('There was an error adding the person!', error);
      });
  };

  const handleDeletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id);
    const confirmDelete = window.confirm('Delete '+personToDelete.name+'?');

    if (confirmDelete) {
      personService.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          console.error('There was an error deleting the person!', error);
        });
    }
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={handleAddPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onDelete={handleDeletePerson} />
    </div>
  );
};

export default App;
