import React from "react";

const Contacts = (props) =>{
    return(
        (props.Search==="")
        ? props.Persons.map(person => <p key = {person.name}> {person.name} <span> {person.number}</span><button className='delete-btn' onClick={() => {props.DeleteContact(person.id)}}>delete</button></p>)
        : props.Persons.filter(person => person.name.toLowerCase().includes(props.Search.toLowerCase())).map(filter => <p key = {filter.name}> {filter.name} <span> {filter.number} </span><button className='delete-btn' onClick={() => {props.DeleteContact(filter.id)}}>delete</button></p>)
    )
  }
export default Contacts