import React, { useState, useEffect } from 'react';
import loginService from './services/login';
import blogService from './services/blogs';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import { useField } from './hooks/index';

function App() {
  const username = useField('text')
  const password = useField('password')

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  const newUrl = useField('text')
  const newTitle = useField('text')
  const newAuthor = useField('text')

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  //Gets user from localstorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggeBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    console.log(username, password)
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })
      console.log('user')
      blogService.setToken(user.token)

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      console.log(user.name, 'logged in')
      setUser(user)
      //clear form
    } catch (e) {
      console.log(e)
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    //clear form
    console.log(`${user.username} logged out`)
  };
  const deleteBlog = id => {
    const result = window.confirm(
      'Are you sure you want to delete this entry?'
    )
    if (result) {
      blogService.deleteBlog(id).then(res => {
        setBlogs(blogs.filter(blog => blog.id !== id))
      })
    }
  }
  const updateLike = id => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    blogService.updateLike(id, updatedBlog).then(returnedBlog => {
      setBlogs(blogs.map(blog => (blog.id !== id ? blog : returnedBlog)))
    })
  };
  const addBlog = e => {
    e.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: newTitle.value,
      author: newAuthor.value,
      url: newUrl.value,
      likes: 0
    }
    blogService
      .create(blogObject)
      .then(data => {
        console.log(data)
        setBlogs(blogs.concat(data))
        console.log(blogFormRef)
      })
      .catch(e => console.log(e.message))
  };

  const rows = () =>
    blogs.map(blog => (
      <Blog
        deleteBlog={deleteBlog}
        updateLike={updateLike}
        key={blog.id}
        blog={blog}
      />
    ))

  const succes = () => (
    <div>
      <h1>Blogs</h1>
      <p>
        {user.name} {user.username} is logged in{' '}
        <button onClick={() => handleLogout()}>Logout!</button>
      </p>

      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm
          addBlog={addBlog}
          newTitle={newTitle}
          newAuthor={newAuthor}
          newUrl={newUrl}
        />
      </Togglable>
      <div> {rows()}</div>
    </div>
  )
  const loginForm = () => {
    return (
      <LoginForm
        password={password}
        username={username}
        handleLogin={handleLogin}
      />
    )
  };
  return <div>{user === null ? loginForm() : succes()}</div>
}

export default App
