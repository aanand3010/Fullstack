import ReactDOM from 'react-dom'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('') 
  const [ newNumber, setNewNumber ] = useState('') 
  const [ newSearch, setNewSearch ] = useState('') 

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      id: persons.length +1,
      name: newName,
      number: newNumber
    } 
    var exists = false

    persons.forEach(element => {
      if(element.name===newName){
        exists = true
        window.alert(newName + ' is already added to phonebook')
        setNewName('')
        setNewNumber('')
      }});

    if (newName === ""){
      window.alert('Blank name not added to phonebook')
    }

    if (exists === false && newName!== "") {
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
    }
  }
  
    const handleNameChange = (event) => {
      setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }
    const handleSearchChange = (event) => {
      setNewSearch(event.target.value)
    }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter Search = {newSearch} SearchChange = {handleSearchChange}/>
      <h2>add a new</h2>
      <PersonForm addName= {addName} Name= {newName} NameChange = {handleNameChange} Number= {newNumber} NumberChange= {handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons Search = {newSearch} Persons= {persons} />
    </div>
  )
}

const Filter = (props) => {
  return(<form>
   <div>
     filter shown with: 
     <input
       placeholder='Search'
       value = {props.Search}
       onChange={props.SearchChange}
     />
   </div>
 </form>
 )
}

const PersonForm = (props) =>{
  return(
    <form onSubmit={props.addName}>
      <div>
        name: <input 
              placeholder='Name'
              value = {props.Name}
              onChange={props.NameChange}
              />
      </div>
      <div>
        number: <input 
                  placeholder='Number'
                  value = {props.Number}
                  onChange={props.NumberChange} 
                />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) =>{
  return(
      (props.Search==="")
      ? props.Persons.map(person => <p key = {person.name}> {person.name} <span> {person.number} </span></p>)
      : props.Persons.filter(person => person.name.toLowerCase().includes(props.Search.toLowerCase())).map(filter => <p key = {filter.name}> {filter.name} <span> {filter.number} </span></p>)
  )
}

export default App
ReactDOM.render(<App />, document.getElementById('root'))