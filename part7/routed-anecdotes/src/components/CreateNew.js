import React from "react";
import { withRouter } from "react-router-dom";

const CreateNew = ({
  info,
  content,
  author,
  addNew,
  setContent,
  setAuthor,
  setInfo,
  setNotification,
  history
}) => {
  const handleSubmit = e => {
    e.preventDefault();
    addNew({
      content,
      author,
      info,
      votes: 0
    });
    setNotification(`A new anecdote ${content} has been created!`);
    history.push("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={info}
            onChange={e => setInfo(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default withRouter(CreateNew);
