import ReactDOM from 'react-dom'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const App = () => {
  const [ Countries, setCountries] = useState([]) 
  const [ newSearch, setNewSearch ] = useState('') 

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    }
  return (
    <div>
      <h2>Country Lookup</h2>
      <Filter Search = {newSearch} SearchChange = {handleSearchChange}/>
      <Country Search = {newSearch} Countries = {Countries}/>
    </div>
  )
}

const Filter = (props) => {
  return(<form>
   <div>
     filter shown with: 
     <input
       placeholder='Find Countries'
       value = {props.Search}
       onChange={props.SearchChange}
     />
   </div>
 </form>
 )
}

const CountryDetail = (props) => {
  return(
    <div>
      <h2 key = {props.Country.name}> {props.Country.name}</h2>
      <p>Capital {props.Country.capital} </p>
      <p>population {props.Country.population} </p>
      <h2>Languages</h2>
      <ul>
      {props.Country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={props.Country.flag} alt="flag" height="100" width="100"></img>
    </div>
  )
}

const FilterList = (props) =>{
  return(
    <div>
      {
        props.List.map(filter => 
        <p key = {filter.name}>{filter.name}
        <button onClick={() => {
        CountryDetail(filter)}}>show</button>
        </p>
        )
      }
    </div>
  )
}

const Country = (props) =>{
  var FilteredCountry = props.Countries.filter(country => country.name.toLowerCase().includes(props.Search.toLowerCase()))
  return(
      (props.Search==="")
      ? <p>Search Something</p>
      : (FilteredCountry.length === 1)
      ? <CountryDetail Country= {FilteredCountry[0]} />
      : (FilteredCountry.length > 10) 
      ? <p>Too many matches, specify another filter</p>
      : <FilterList List= {FilteredCountry} />
  )
}

export default App
ReactDOM.render(<App />, document.getElementById('root'))