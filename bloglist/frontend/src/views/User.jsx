import { useState, useEffect } from 'react'
import usersService from '../services/users'
import { Link, Route, Routes, useParams } from 'react-router-dom'

const User = ({}) => {
  const { id } = useParams()

  const [user, setUser] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await usersService.getUser(id)
        setUser(response)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [id])

  return (
    <div key={id}>
      <h2>User: {user?.username}</h2>
      <h2>added blogs</h2>
      <ul>
        {user?.blogs.map((blog) => (
          <li className="m-2 mx-10 text-xl underline" key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              <span>{blog.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User
