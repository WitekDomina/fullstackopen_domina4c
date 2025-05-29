const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const persons = [
  { 
    id: "1",
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: "2",
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: "3",
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: "4",
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  }
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  const currentTime = new Date().toString();
  const numberOfEntries = persons.length;

  res.send(`
    <div>
      <p>Phonebook has info for ${numberOfEntries} people</p>
      <p>${currentTime}</p>
    </div>
  `);
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find(p => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).send({ error: 'Person not found' });
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const index = persons.findIndex(p => p.id === id);

  if (index !== -1) {
    persons.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).send({ error: 'Person not found' });
  }
});

app.post('/api/persons', (req, res) => {
  const {name, number} = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: 'Name or number is missing' });
  }

  if (persons.find(p => p.name === name)){
    return res.status(400).json({ error: 'Name must be unique' });
  }

  const newPerson = {
    id: (Math.floor(Math.random() * 1000000)).toString(),
    name: name,
    number: number
  };

  persons.push(newPerson);
  res.status(201).json(newPerson);
});


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
