import React from "react";

const PersonForm = (props) =>{
    return(
      <form onSubmit={props.addContact}>
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

  export default PersonForm;