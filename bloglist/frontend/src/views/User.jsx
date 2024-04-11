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
      <h1>{user?.username}</h1>
      <h2>added blogs</h2>
      <div>
        {user?.blogs.map((blog) => (
          <div key={blog.id}>{blog.title}</div>
        ))}
      </div>
    </div>
  )
}

export default User
