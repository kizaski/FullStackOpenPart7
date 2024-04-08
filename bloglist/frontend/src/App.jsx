import Notification from './components/Notification'
import Users from './components/Users'
import Home from './Home'
import { useSelector } from 'react-redux'
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
