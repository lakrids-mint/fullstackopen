import React, { useState } from "react";
import Menu from "./components/NavBar";
import About from "./components/About";
import Home from "./components/Home";
import CreateNew from "./components/CreateNew";
import Footer from "./components/Footer";
import Anecdote from "./components/Anecdote";
import Anecdotes from "./components/Anecdotes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1"
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2"
    }
  ]);
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [info, setInfo] = useState("");

  const [notification, setNotification] = useState("");

  const addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = id => anecdotes.find(a => a.id === id);

  const vote = id => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    setAnecdotes(anecdotes.map(a => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <Router>
        <div>
          <h1>Software anecdotes</h1>
          <Menu />
          {notification ? <p>{notification}</p> : ""}
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Home anecdotes={anecdotes} />}
            />
            <Route path="/about" render={() => <About />} />
            <Route
              path="/create"
              render={() => (
                <CreateNew
                  info={info}
                  content={content}
                  author={author}
                  addNew={addNew}
                  setContent={setContent}
                  setAuthor={setAuthor}
                  setInfo={setInfo}
                  setNotification={setNotification}
                />
              )}
            />
            <Route
              exact
              path="/anecdotes"
              render={() => <Anecdotes anecdotes={anecdotes} />}
            />

            <Route
              exact
              path="/anecdotes/:id"
              render={({ match }) => (
                <Anecdote anecdote={anecdoteById(match.params.id)} />
              )}
            />
          </Switch>
          <p>_________________________________________________</p>
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;
