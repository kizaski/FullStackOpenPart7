import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotificationWithTimeout } from './features/notificationSlice'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const notification = useSelector((state) => state.notification)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogsObj) => {
      const blogsArr = Array.from(blogsObj)
      setBlogs(blogsArr.sort((a, b) => b.likes - a.likes))
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      console.log(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(
        setNotificationWithTimeout({
          message: 'Wrong credentials',
          type: 'error',
          timeout: 3000,
        }),
      )
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="login" buttonHideLabel="cancel">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const handleNewBlog = async (event) => {
    event.preventDefault()

    blogFormRef.current.toggleVisibility()

    try {
      const newblog = await blogService.create({
        title: title,
        author: author,
        url: url,
        user: user.id,
      })

      setBlogs([...blogs, newblog])

      dispatch(
        setNotificationWithTimeout(
          `A new blog ${newblog.title} by ${newblog.author} is added`,
          'info',
          3000,
        ),
      )

      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      dispatch(setNotificationWithTimeout('Error creating blog.', 'info', 3000))
    }
  }

  const handleDeleteBlog = async (id, blog) => {
    try {
      if (
        !window.confirm(
          `Do you really want to delete ${blog.title} by ${blog.author}?`,
        )
      ) {
        return
      }
      await blogService.remove(id)
      const blogs = await blogService.getAll()
      setBlogs(blogs)

      dispatch(
        setNotificationWithTimeout(
          `The blog ${blog.title} by ${blog.author} is deleted`,
          'info',
          3000,
        ),
      )
    } catch (exception) {
      dispatch(
        setNotificationWithTimeout(
          `Error deleting blog. ${exception}`,
          'error',
          3000,
        ),
      )
    }
  }

  const handleUpdateBlog = async (blog) => {
    try {
      await blogService.update(blog.id, blog)
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    } catch (exception) {
      console.log(`error updating blog, exceptio: ${exception}`)
    }
  }

  const newBlogForm = () => (
    <Togglable
      buttonLabel="new blog"
      buttonHideLabel="cancel"
      ref={blogFormRef}
    >
      <NewBlogForm
        handleSubmit={handleNewBlog}
        handleTitleChange={({ target }) => setTitle(target.value)}
        titleVal={title}
        handleAuthorChange={({ target }) => setAuthor(target.value)}
        authorVal={author}
        handleUrlChange={({ target }) => setUrl(target.value)}
        urlVal={url}
      />
    </Togglable>
  )

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />

      {user === null && loginForm()}
      {user !== null && (
        <div>
          <div>
            <div>{user.name} logged in.</div>
            <button onClick={handleLogout}>logout</button>
          </div>
          <div>{newBlogForm()}</div>
        </div>
      )}

      <h2>blogs</h2>
      <div id="blogs-list">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            deleteBlog={handleDeleteBlog}
            updateBlog={handleUpdateBlog}
            user={user}
          />
        ))}
      </div>
    </div>
  )
}

export default App
