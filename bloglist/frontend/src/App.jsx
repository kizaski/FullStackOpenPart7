import Notification from './components/Notification'
import SignupForm from './components/SignupForm'
import Togglable from './components/Togglable'
import Logout from './components/Logout'
import LoginForm from './components/LoginForm'
import Users from './views/Users'
import User from './views/User'
import Home from './views/Home'
import BlogView from './views/BlogView'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'
import { setUser } from './features/userSlice'

const App = () => {
  const dispatch = useDispatch()

  const notification = useSelector((state) => state.notification)
  const user = useSelector((state) => state.user)

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />

      <nav>
        <Link className="mx-2" to="/">
          home
        </Link>
        <Link className="mx-2" to="/users">
          users
        </Link>
        <Link className="mx-2" to="/">
          blogs
        </Link>
        {user === null ? (
          <div>
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

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogView />} />
      </Routes>
    </div>
  )
}

export default App
