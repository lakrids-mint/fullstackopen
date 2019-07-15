import React, { useState, useEffect } from "react";
import loginService from "./services/login";
import blogService from "./services/blogs";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
//import DisplayBlogs from "./components/DisplayBlogs";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [newUrl, setNewUrl] = useState([]);
  const [newTitle, setNewTitle] = useState([]);
  const [newAuthor, setNewAuthor] = useState([]);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  //Gets user from localstorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggeBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      console.log(user.token);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });
      blogService.setToken(user.token);

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      console.log(user.name, "logged in");
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (e) {
      console.log(e);
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
    setUsername("");
    setPassword("");
    console.log(`${user.username} logged out`);
  };
  const deleteBlog = id => {
    const result = window.confirm(
      `Are you sure you want to delete this entry?`
    );
    if (result) {
      blogService.deleteBlog(id).then(res => {
        setBlogs(blogs.filter(blog => blog.id !== id));
      });
    }
  };

  const addBlog = e => {
    e.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    };
    blogService
      .create(blogObject)
      .then(data => {
        console.log(data);
        setBlogs(blogs.concat(data));
      })
      .catch(e => console.log(e.message));
  };
  const rows = () =>
    blogs.map(blog => (
      <Blog deleteBlog={deleteBlog} key={blog.id} blog={blog} />
    ));

  const succes = () => (
    <div>
      <h1>Blogs</h1>
      <p>
        {user.name} {user.username} is logged in
      </p>
      <button onClick={() => handleLogout()}>Logout!</button>
      <h2>Create new blog</h2>
      <BlogForm
        addBlog={addBlog}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newAuthor={newAuthor}
        setNewAuthor={setNewAuthor}
        newUrl={newUrl}
        setNewUrl={setNewUrl}
      />
      <div> {rows()}</div>
    </div>
  );
  const loginForm = () => {
    return (
      <LoginForm
        password={password}
        username={username}
        setPassword={setPassword}
        setUsername={setUsername}
        handleLogin={handleLogin}
      />
    );
  };
  return <div>{user === null ? loginForm() : succes()}</div>;
}

export default App;
