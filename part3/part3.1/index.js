require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
var morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use(morgan(function (tokens, req, res) {
    morgan.token('body', function(req, res) {
        return JSON.stringify(req.body)
    });
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.body(req,res)
    ].join(' ')
  }))


app.get('/', (request, response) => {
    response.send('<h1>PhoneBook App</h1>')
    }
)

app.get('/info', (request, response) => {
    const contacts = persons.length
    const date = new Date()
    response.send('Phonebook has info for ' + contacts + ' people.' + date)
})

app.get('/api/persons/', (request, response) => {
    Contact.find({}).then(persons => {
        response.json(persons.map(person => person.toJSON()))
    })        
})

app.get('/api/persons/:id', (request, response,next) => {
    Contact.findById(request.params.id)
    .then(contact => {
        if (contact) {
           response.json(contact.toJSON())
          } else {
            response.status(404).end() 
          }
    })
    .catch(error => next(error))
  })

app.delete('/api/persons/:id', (request, response,next) => {
    Contact.findByIdAndUpdate(request.params.id)
    .then(contact => {
        response.status(404).end() 
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (body.name === undefined ||  body.number === undefined) {
      return response.status(400).json({ error: 'name or number missing' })
    }
  
    const contact = new Contact({
        name: body.name,
        number: body.number
    })
  
    contact.save().then(savedNote => {
            response.json(savedNote.toJSON())
    })
    
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const contact = {
      name: body.name,
      number: body.number,
    }
  
    Contact.findByIdAndUpdate(request.params.id, contact, { new: true })
      .then(updatedContact => {
        response.json(updatedContact.toJSON())
      })
      .catch(error => next(error))
  })

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
}
  
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('Server running on port' + PORT)
})