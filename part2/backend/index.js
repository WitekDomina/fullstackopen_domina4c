const express = require('express')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({ error: 'name or number missing' })
  }

  const person = new Person({ name, number })

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then(count => {
      res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
      `)
    })
    .catch(error => next(error))
})


app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      if (result) {
        console.log('Deleted person:', result)
        res.status(204).end()
      } else {
        console.warn('Person not found with id:', req.params.id)
        res.status(404).send({ error: 'Person not found' })
      }
    })
    .catch(error => {
      console.error('Error deleting person:', error)
      next(error)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  const updatedPerson = { name, number }

  console.log('Updating person with id:', req.params.id, 'to:', updatedPerson);

  Person.findByIdAndUpdate(req.params.id, updatedPerson, { new: true, runValidators: true, context: 'query' })
    .then(result => {
      console.log('Update result:', result);
      if (result) {
        res.json(result)
      } else {
        res.status(404).send({ error: 'Person not found' })
      }
    })
    .catch(error => next(error))
})



app.use((error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
