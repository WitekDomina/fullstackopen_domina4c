import React, { useState, useEffect } from 'react';
import personService from './personService';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Notification from './Notification';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState({ message: null, type: null });


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
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 4000);
  };
  

  const handleAddPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmReplace = window.confirm(
        `${newName} is already added to the phonebook. Do you want to replace the old number with the new one?`
      );

      if (confirmReplace) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService.update(existingPerson.id, updatedPerson)
        .then(response => {
          setPersons(persons.map(person => 
            person.id === existingPerson.id ? response.data : person
          ));
          setNewName('');
          setNewNumber('');
          showNotification(`Updated ${updatedPerson.name}`, 'success');
        })
        .catch(error => {
          console.error('There was an error updating the phone number!', error);
          showNotification(
            `Information of ${updatedPerson.name} has already been removed from server`,
            'error'
          );
          setPersons(persons.filter(p => p.id !== existingPerson.id));
        });
      }
      return;
    }

    const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0;
    const newId = (maxId + 1).toString();

    const personObject = { name: newName, number: newNumber, id: newId };

    personService.create(personObject)
    .then(response => {
    setPersons(persons.concat(response.data));
    setNewName('');
    setNewNumber('');
    showNotification(`Added ${personObject.name}`, 'success');
  })
  .catch(error => {
    console.error('There was an error adding the person!', error);
    showNotification('Failed to add person', 'error');
  });
  };

  const handleDeletePerson = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this person?');

    if (confirmDelete) {
      personService.deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
        showNotification('Deleted person', 'success');
      })
      .catch(error => {
        console.error('There was an error deleting the person!', error);
        showNotification('Failed to delete person. They may have already been removed.', 'error');
      });
    }
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
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
