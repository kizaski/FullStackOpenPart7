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

      const res = await dispatch(userSignup(user))
      if (res.error) throw new Error(`${res.error}`)

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
      <h2 className="m-2">Signup</h2>

      <form className="mx-4" onSubmit={handleSubmit} id="signup-form">
        <div className="my-2">
          <label className="m-2">username</label>
          <input
            className="rounded-md outline-double"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
        </div>
        <div className="my-2">
          <label className="m-2">password</label>
          <input
            className="rounded-md outline-double"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <div className="my-2">
          <label className="m-2">name</label>
          <input
            className="rounded-md outline-double"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </div>
        <button className="rounded-md px-2 py-1 outline-double" type="submit">
          signup
        </button>
      </form>
    </div>
  )
}

export default LoginForm
