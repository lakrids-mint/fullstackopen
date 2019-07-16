import React from "react";

const Blog = ({ blog, deleteBlog, updateLike }) => {
  return (
    <div>
      {blog.title}
      {blog.likes}
      <button onClick={() => deleteBlog(blog.id)}>Delete</button>
      <button onClick={() => updateLike(blog.id)}>Like</button>
    </div>
  );
};

export default Blog;
