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
      <div className="flex">
        <div className="mx-2">{user.name} logged in.</div>
        <button
          className="rounded-md px-2 py-1 outline-double"
          onClick={handleLogout}
        >
          logout
        </button>
      </div>
    </div>
  )
}

export default Logout
