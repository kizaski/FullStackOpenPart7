import { useState, useEffect, useRef } from 'react'
import Blog from '../components/Blog'
import Notification from '../components/Notification'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
import Togglable from '../components/Togglable'
import NewBlogForm from '../components/NewBlogForm'
import Users from './Users'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotificationWithTimeout } from '../features/notificationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs, createBlog } from '../features/blogsSlice'
import { setUser } from '../features/userSlice'
import { Link, Route, Routes } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => {
    // console.log('logging ', state)
    return state.blogs
  })

  const user = useSelector((state) => state.user)

  const notification = useSelector((state) => state.notification)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  const handleNewBlog = async (event) => {
    event.preventDefault()

    blogFormRef.current.toggleVisibility()

    try {
      const newblog = {
        title: title,
        author: author,
        url: url,
        user: user.id,
      }

      dispatch(createBlog(newblog))

      dispatch(
        setNotificationWithTimeout({
          message: `A new blog ${newblog.title} by ${newblog.author} is added`,
          type: 'info',
          timeout: 3000,
        }),
      )

      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      dispatch(
        setNotificationWithTimeout({
          message: 'Error creating blog.',
          type: 'info',
          timeout: 3000,
        }),
      )
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

      dispatch(fetchBlogs(blogs))

      dispatch(
        setNotificationWithTimeout({
          message: `The blog ${blog.title} by ${blog.author} is deleted`,
          type: 'info',
          timeout: 3000,
        }),
      )
    } catch (exception) {
      dispatch(
        setNotificationWithTimeout({
          message: `Error deleting blog. ${exception}`,
          type: 'error',
          timeout: 3000,
        }),
      )
    }
  }

  const handleUpdateBlog = async (blog) => {
    try {
      await blogService.update(blog.id, blog)
      dispatch(fetchBlogs())
    } catch (exception) {
      console.log(`error updating blog, exception: ${exception}`)
    }
  }

  return (
    <div>
      {user !== null && (
        <div>
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
        </div>
      )}

      <h2>Blogs</h2>
      <div className="flex-grow border-t border-gray-400 p-2"></div>
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
