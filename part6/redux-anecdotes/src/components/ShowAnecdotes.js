import React from "react";
import { connect } from "react-redux";
import { submitVote } from "../reducers/anecdoteReducer";
import { notificationChange } from "../reducers/notificationReducer";

const ShowAnecdotes = props => {
  const anecdotes = props.anecdotes;
  const searchTerm = props.filter;
  console.log("from line 9", anecdotes);

  const anecdotesToShow = async () => {
    const res = await anecdotes.filter(a => a.content.icludes(searchTerm));
    return res;
  };

  return <div>{props.anecdotes}</div>;
};

const mapStateToProps = state => {
  // sometimes it is useful to console log from mapStateToProps
  console.log(state);
  return {
    anecdotes: state.anecdotes,
    filter: state.userInput
  };
};
const mapDispatchToProps = {
  submitVote,
  notificationChange
};
const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowAnecdotes);

export default ConnectedAnecdotes;
