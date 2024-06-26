import Notification from './components/Notification'
import SignupForm from './components/SignupForm'
import Togglable from './components/Togglable'
import Logout from './components/Logout'
import LoginForm from './components/LoginForm'
import MobileNav from './components/MobileNav'
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
    <div className="min-h-screen bg-slate-800 text-gray-300">
      <Notification message={notification.message} type={notification.type} />

      <nav className="hidden items-start sm:flex">
        <Link className="m-2 p-2 underline" to="/">
          home
        </Link>
        <Link className="m-2 p-2 underline" to="/users">
          users
        </Link>
        <Link className="m-2 p-2 underline" to="/">
          blogs
        </Link>
        {user === null ? (
          <div className="flex">
            <Togglable buttonLabel="login" buttonHideLabel="cancel">
              <LoginForm />
            </Togglable>
            <Togglable buttonLabel="signup" buttonHideLabel="cancel">
              <SignupForm />
            </Togglable>
          </div>
        ) : (
          <div className="m-2 flex p-2 ">
            <Logout />
          </div>
        )}
      </nav>

      <MobileNav />

      <div className="flex-grow border-t border-gray-400 p-2"></div>

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
