import { useState } from 'react'
import userService from '../services/users'
import { useDispatch, useSelector } from 'react-redux'
import { userSignup } from '../features/userSlice'
import { setNotificationWithTimeout } from '../features/notificationSlice'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [name, setName] = useState()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = {
        username,
        password,
        name,
      }

      dispatch(userSignup(user))

      setUsername('')
      setPassword('')
      setName('')

      dispatch(
        setNotificationWithTimeout({
          message: `New user ${username} created`,
          type: 'info',
          timeout: 3000,
        }),
      )
    } catch (exception) {
      dispatch(
        setNotificationWithTimeout({
          message: 'Could not create user',
          type: 'error',
          timeout: 3000,
        }),
      )
    }
  }

  return (
    <div>
      <h2>Signup</h2>

      <form onSubmit={handleSubmit} id="signup-form">
        <div>
          <label>username</label>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
        </div>
        <div>
          <label>password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <div>
          <label>name</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </div>
        <button type="submit">signup</button>
      </form>
    </div>
  )
}

export default LoginForm
