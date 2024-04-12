import { useState } from 'react'
import loginService from '../services/login'
import { useDispatch, useSelector } from 'react-redux'
import { userSignup } from '../features/userSlice'
import { setNotificationWithTimeout } from '../features/notificationSlice'
import { setUser } from '../features/userSlice'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      dispatch(setUser(user))

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

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin} id="login-form">
        <div>
          <label>username</label>
          <input
            id="username-input"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label>password</label>
          <input
            id="password-input"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
