import React, { useState, useEffect } from 'react'
import promiseService from './services/promises'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Contacts from "./components/Contacts";
import Notification from "./components/notification";
import Footer from "./components/footer";

const App = () => {
  const [ persons, setPersons] = useState([{
      name: "Arpit",
      number: "34252435"
  }]) 
  const [ newName, setNewName ] = useState('') 
  const [ newNumber, setNewNumber ] = useState('') 
  const [ newSearch, setNewSearch ] = useState('') 
  const [errorMessage, setErrorMessage] = useState({ text: null });

  let timerIDs = []

  const getContacts = () => {
    promiseService
      .getAll()
      .then(initialNames => {
        setPersons(initialNames)
      })
  }
  useEffect(getContacts, [])

  const showNotificationMsg = (msg, isError) => {
    if (timerIDs.length > 0) {
     timerIDs.forEach(id => clearTimeout(id));
     timerIDs = [];
   }
    setErrorMessage({ text: msg, isError });
    timerIDs.push(
      setTimeout(() => {
        setErrorMessage({ text: null });
        timerIDs.shift();
      }, 5000)
    );
  };

  const addContact = (event) => {
    event.preventDefault()
    var exists = false

    const personObject = {
      name: newName,
      number: newNumber
    }   
    persons.forEach(element => {
      if(element.name===newName){
        exists = true
        var resp = window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')
        if(resp===true){
          UpdateContact(element.id)
          setNewName('')
          setNewNumber('')
        }
      }});
  
    if (newName === ""){
      showNotificationMsg('Blank name not added to phonebook', true)
    }
  
    if (exists === false && newName!== "") {
      promiseService
      .create(personObject)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact))
        showNotificationMsg('Successfully added ' + newName, false);
      }).catch(err => {
        showNotificationMsg('Contact already exists', true);
      });
      setNewName('')
      setNewNumber('')
    }
  }
  
  const UpdateContact = id => {
    const person = persons.find(n => n.id === id)
    const changedContact = { ...person, number: newNumber }
    promiseService
      .update(id, changedContact)
        .then(returnedContact => {
          setPersons(persons.map(person => person.id !== id ? person : returnedContact))
          showNotificationMsg('Info updated for ' + newName, false);
      })
  }

  const DeleteContact = (id) => {
    const targetPerson = persons.find(person => person.id === id);
    var resp = window.confirm('Do you want to delete Contact: ' + targetPerson.name + '?')
        if(resp===true){
            promiseService
              .del(id)
                .then(() => {
                  showNotificationMsg(targetPerson.name + ' Contact Deleted', false)
                  getContacts()
                }).catch(err => {
                  showNotificationMsg('Contact ' + targetPerson.name + ' already deleted from the server', true);
                }); 
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
      <Notification error={errorMessage} />
      <Filter Search = {newSearch} SearchChange = {handleSearchChange}/>
      <h2>add a new</h2>
      <PersonForm addContact={addContact} Name= {newName} NameChange = {handleNameChange} Number= {newNumber} NumberChange= {handleNumberChange}/>
      <h2>Numbers</h2>
      <Contacts Search = {newSearch} Persons= {persons} DeleteContact= {DeleteContact} />
      <Footer />
    </div>
  )
}

export default App
