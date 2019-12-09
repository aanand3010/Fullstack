require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
var morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')

//const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(bodyParser.json())

let persons = [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
]

// const url =
// `mongodb+srv://fullstack:fullstack@fullstack-mpqyb.mongodb.net/phonebook-app?retryWrites=true&w=majority`

// mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })

// const contactSchema = new mongoose.Schema({
//     name: String,
//     number: String,
// })
// const Contact = mongoose.model('Contact', contactSchema)

// contactSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//       returnedObject.id = returnedObject._id.toString()
//       delete returnedObject._id
//       delete returnedObject.__v
//     }
//   })

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


//const requestLogger = (request, response, next) => {
//    console.log('Method:', request.method)
//    console.log('Path:  ', request.path)
//    console.log('Body:  ', request.body)
//    console.log('---')
//    next()
//  }
//app.use(requestLogger)

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

// app.get('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const person = persons.find(person => person.id === id)
//     if(person){
//         response.json(person)
//     } else
//     response.status(404).end() 
// })

app.get('/api/notes/:id', (request, response) => {
    Contact.findById(request.params.id).then(contact => {
      response.json(contact.toJSON())
    })
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    person = persons.filter(person => person.id !== id)
    
    response.status(204).end()
})

const generateId = () => {
    const id = Math.floor(Math.random() * Math.floor(1000))
    return id
}

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

// app.post('/api/persons', (request, response) => {
//     const body = request.body
//     let exists = false

//     persons.forEach(element => {
//         if(element.name===body.name){
//             exists = true
//         }
//     })

//     if (exists === true){
//         return response.status(400).json({
//             error: 'name must be unique'
//         })
//     }
//     else if (!body.name){
//         return response.status(400).json({
//             error: 'name missing'
//         })
//     } else if (!body.number){
//         return response.status(400).json({
//             error: 'number missing'
//         })
//     } 
    
//     const person = {
//         name: body.name, 
//         number: body.number,
//         id: generateId(),
//     }

//     persons = persons.concat(person)
  
//     response.json(person)
// })

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const PORT = process.env.PORT //|| 3001
app.listen(PORT, () => {
    console.log('Server running on port' + PORT)
})