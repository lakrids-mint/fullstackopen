import React from 'react';

const SimpleBlog = ({ blog, updateLike }) => (
  <div>
    <div className="blog">
      {blog.title} {blog.author}
    </div>
    <div>
      blog has {blog.likes} likes
      <button onClick={updateLike}>like</button>
    </div>
  </div>
)

export default SimpleBlog
