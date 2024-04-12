import { useState } from 'react'
import userService from '../services/users'
import { useDispatch, useSelector } from 'react-redux'
import { userSignup } from '../features/userSlice'
import { setNotificationWithTimeout } from '../features/notificationSlice'
import { setUser } from '../features/userSlice'
import { Link, Route, Routes } from 'react-router-dom'
import Togglable from '../components/Togglable'
import Logout from '../components/Logout'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'

const MobileNav = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  return (
    <div className="mb-6 flex sm:hidden">
      <Togglable buttonLabel="menu" buttonHideLabel="close">
        <nav className="flex flex-col">
          <Link className="mx-2 my-2" to="/">
            home
          </Link>
          <Link className="mx-2 my-2" to="/users">
            users
          </Link>
          <Link className="mx-2 my-2" to="/">
            blogs
          </Link>
          {user === null ? (
            <div className="mx-2 my-2">
              <Togglable buttonLabel="login" buttonHideLabel="cancel">
                <LoginForm />
              </Togglable>
              <Togglable buttonLabel="signup" buttonHideLabel="cancel">
                <SignupForm />
              </Togglable>
            </div>
          ) : (
            <Logout />
          )}
        </nav>
      </Togglable>
    </div>
  )
}

export default MobileNav
