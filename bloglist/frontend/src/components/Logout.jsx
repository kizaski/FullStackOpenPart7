import { useState } from 'react'
import userService from '../services/users'
import { useDispatch, useSelector } from 'react-redux'
import { userSignup } from '../features/userSlice'
import { setNotificationWithTimeout } from '../features/notificationSlice'
import { setUser } from '../features/userSlice'

const Logout = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }

  return (
    <div>
      <div className="flex items-center">
        <div className="mx-2">{user.name} logged in.</div>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}

export default Logout
