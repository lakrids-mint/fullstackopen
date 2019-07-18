import React from 'react';

const BlogForm = ({ addBlog, newTitle, newAuthor, newUrl }) => {
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title
          <input {...newTitle} />
        </div>
        <div>
          Author
          <input {...newAuthor} />
        </div>
        <div>
          Url
          <input {...newUrl} />
        </div>
        <div>
          <input type="submit" value="Create" />
        </div>
      </form>
    </div>
  )
};
export default BlogForm
