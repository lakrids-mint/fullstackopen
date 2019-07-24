import React from "react";
import { Link } from "react-router-dom";

const Anecdotes = props => {
  console.log(props);
  return (
    <div>
      <ul>
        {props.anecdotes.map(a => (
          <li key={a.id}>
            <Link to={`/anecdotes/${a.id}`}>{a.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Anecdotes;
