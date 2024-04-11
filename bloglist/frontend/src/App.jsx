import Notification from './components/Notification'
import Users from './views/Users'
import Home from './views/Home'
import { useSelector } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'

const App = () => {
  const notification = useSelector((state) => state.notification)

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
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element />
        <Route path="/blogs/:id" element />
      </Routes>
    </div>
  )
}

export default App
