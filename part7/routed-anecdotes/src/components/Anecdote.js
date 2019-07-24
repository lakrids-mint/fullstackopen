import React from "react";

const Anecdote = props => {
  console.log(props);
  return (
    <div>
      <h1>single anecdote</h1>
      <h3>
        {props.anecdote.content} by {props.anecdote.content}
      </h3>
      <p>has {props.anecdote.votes} votes!</p>
      <p>
        for more info see{" "}
        <a href={props.anecdote.info}>{props.anecdote.info}</a>
      </p>
    </div>
  );
};

export default Anecdote;
