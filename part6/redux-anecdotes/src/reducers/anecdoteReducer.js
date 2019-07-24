import anecdoteService from "../services/anecdotes";

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      return action.data;
    case "INIT_ANECDOTES":
      console.log("init");
      return action.data;
    case "CREATE":
      return [...state, action.data];
    default:
      return state;
  }
};
//action creators
export const submitVote = id => {
  console.log("action crator, vote id", id);
  return async dispatch => {
    console.log("dispathing vote");
    dispatch({
      type: "VOTE",
      data: id
    });
  };
};

export const initializeAnecdotes = () => {
  console.log("initialize anecdotes");
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    console.log("dispatching", anecdotes);
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    });
  };
};
export const createAnecdote = data => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data);
    dispatch({ type: "CREATE", data: newAnecdote });
  };
};
export default anecdoteReducer;
