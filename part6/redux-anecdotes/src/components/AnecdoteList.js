import React from "react";
import { connect } from "react-redux";
import { submitVote } from "../reducers/anecdoteReducer";
import { notificationChange } from "../reducers/notificationReducer";

const AnecdoteList = props => {
  console.log(props);
  const anecdotes = props.anecdotes;
  const searchTerm = props.filter;
  console.log("from line 9", anecdotes);

  const anecdotesToShow = async () => {
    const res = await anecdotes.filter(a => a.content.icludes(searchTerm));
    return res;
  };

  const vote = async id => {
    await props.submitVote(id);

    const upvotedAnecdote = props.anecdotes.find(a => a.id === id);

    //informing the user of their action
    props.notificationChange(`You upvoted:  "${upvotedAnecdote.content}"`);
    setTimeout(() => props.notificationChange(""), 2000);
  };

  return (
    <div>
      <div>
        {anecdotesToShow.map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
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
)(AnecdoteList);

export default ConnectedAnecdotes;
