import React, { useState, useEffect } from "react";
import loginService from "./services/login";
import blogService from "./services/blogs";
import Blog from "./components/Blog";

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
  const addBlog = e => {
    e.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    };
    console.log(blogObject);
    blogService
      .create(blogObject)
      .then(data => {
        console.log(data);
        setBlogs(blogs.concat(data));
      })
      .catch(e => console.log(e.message));
  };
  const rows = () => blogs.map(blog => <Blog key={blog.id} blog={blog} />);
  const succes = () => (
    <div>
      <h1>Blogs</h1>
      <p>
        {user.name} {user.username} is logged in{" "}
      </p>{" "}
      <button onClick={() => handleLogout()}>Logout!</button>
      <div>
        <h2>Create new blog</h2>
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
      </div>
      <div> {rows()}</div>
    </div>
  );
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
  return <div>{user === null ? loginForm() : succes()}</div>;
}

export default App;
