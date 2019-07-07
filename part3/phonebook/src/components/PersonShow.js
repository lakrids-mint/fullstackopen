import React from "react";

const PersonShow = ({ id, name, number, deletePerson }) => {
  return (
    <li>
      {name}: {number}
      <button onClick={() => deletePerson(id)}>delete</button>
    </li>
  );
};

export default PersonShow;
