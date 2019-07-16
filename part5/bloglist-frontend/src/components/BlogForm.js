import React from "react";

const BlogForm = ({
  addBlog,
  newTitle,
  setNewTitle,
  newAuthor,
  setNewAuthor,
  newUrl,
  setNewUrl
}) => {
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <input
            placeholder="title"
            type="text"
            name="title"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          <input
            placeholder="author"
            type="text"
            name="author"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          <input
            placeholder="www.myurl.dk"
            type="text"
            name="url"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <div>
          <input type="submit" value="Create" />
        </div>
      </form>
    </div>
  );
};
export default BlogForm;
