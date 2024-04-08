import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import Users from './components/Users'
import Home from './Home'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotificationWithTimeout } from './features/notificationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs, createBlog } from './features/blogsSlice'
import { setUser } from './features/userSlice'
import { Link, Route, Routes } from 'react-router-dom'

const App = () => {
  const notification = useSelector((state) => state.notification)

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />

      <div>
        <Link to="/users">users</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  )
}

export default App
