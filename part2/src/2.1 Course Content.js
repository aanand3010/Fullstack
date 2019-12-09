import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web Development Curriculum</h1>
      <h2>{courses[0].name}</h2>
      <p>{courses[0].parts[0].name} {courses[0].parts[0].exercises}</p>
      <p>{courses[0].parts[1].name} {courses[0].parts[1].exercises}</p>
      <p>{courses[0].parts[2].name} {courses[0].parts[2].exercises}</p>
      <p>{courses[0].parts[3].name} {courses[0].parts[3].exercises}</p>
      <h3>total of {courses[0].parts[0].exercises + courses[0].parts[1].exercises+ courses[0].parts[2].exercises+ courses[0].parts[3].exercises} exercises</h3>
      <h2>{courses[1].name}</h2>   
      <p>{courses[1].parts[0].name} {courses[1].parts[0].exercises}</p>
      <p>{courses[1].parts[1].name} {courses[1].parts[1].exercises}</p>
      <h3>total of {courses[1].parts[0].exercises + courses[1].parts[1].exercises} exercises</h3>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)