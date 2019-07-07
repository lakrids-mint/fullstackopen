import React from "react";

const PersonForm = props => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name:
        <input
          value={props.newName}
          name="name"
          onChange={e => props.setNewName(e.target.value)}
        />
        Phone number
        <input
          value={props.newNumber}
          name="number"
          onChange={e => props.setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <input type="submit" value="add" />
      </div>
    </form>
  );
};
export default PersonForm;
