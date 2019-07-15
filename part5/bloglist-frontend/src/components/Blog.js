import React from "react";

const Blog = ({ blog, deleteBlog }) => {
  return (
    <div>
      {blog.title}
      <button onClick={() => deleteBlog(blog.id)}>Delete</button>
    </div>
  );
};

export default Blog;
