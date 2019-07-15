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
    <form onSubmit={addBlog}>
      <input
        placeholder="title"
        type="text"
        name="title"
        value={newTitle}
        onChange={({ target }) => setNewTitle(target.value)}
      />
      <input
        placeholder="author"
        type="text"
        name="author"
        value={newAuthor}
        onChange={({ target }) => setNewAuthor(target.value)}
      />
      <input
        placeholder="www.myurl.dk"
        type="text"
        name="url"
        value={newUrl}
        onChange={({ target }) => setNewUrl(target.value)}
      />
      <input type="submit" value="Create" />
    </form>
  );
};
export default BlogForm;
