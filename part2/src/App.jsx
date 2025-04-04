import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleAddPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0;
    const newId = maxId + 1;

    const personObject = { name: newName, number: newNumber, id: newId };
    axios
      .post('http://localhost:3001/persons', personObject)
      .then((response) => {
        setPersons(persons.concat(response.data));
        setNewName('');
        setNewNumber('');
      })
      .catch((error) => {
        console.error('There was an error adding the person!', error);
      });
  };

  const filteredPersons = persons.filter((person) =>
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
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
