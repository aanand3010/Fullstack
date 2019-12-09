import React from "react";

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

export default Filter;