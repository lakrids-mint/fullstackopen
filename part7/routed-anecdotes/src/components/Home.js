import React from "react";
import Anecdotes from "./Anecdotes";

const Home = ({ anecdotes }) => {
  return <Anecdotes anecdotes={anecdotes} />;
};

export default Home;
