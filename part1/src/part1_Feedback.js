import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = (props) =>{

  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const all =good+neutral+bad
  const average = (good-bad)/all
  const positive = (good/all)*100

  if(good === 0 && neutral === 0 && bad === 0){

    return(
    <div>
      <h1>Statistics</h1>
      <p>No Feedback Given</p>
      </div>
    )
  }

  return(
    <div>
      <h1>Statistics</h1>
      <table>
      <tbody>
      <Statistic text="good" value ={good} />
      <Statistic text="neutral" value ={neutral} />
      <Statistic text="bad" value ={bad} />
      <Statistic text="all" value = {all} />
      <Statistic text="average" value = {average} />
      <Statistic text="positive" value = {positive} />
      </tbody>
      </table>

    </div>
  )
}
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={()=>setGood(good+1)} text='good' />
      <Button onClick={()=>setNeutral(neutral+1)} text='neutral' />
      <Button onClick={()=>setBad(bad+1)} text='bad' />
      <Statistics good = {good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)