import { useState, useEffect } from 'react'
import usersService from '../services/users'
import User from '../components/User'

const Users = ({}) => {
  const [users, setUsers] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await usersService.getAll()
        console.log(response)
        setUsers(response)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <div>users:</div>
      <div>
        {users?.map((user) => (
          <User
            key={user.id}
            username={user.username}
            name={user.name}
            blogs={user.blogs}
          />
        ))}
      </div>
    </div>
  )
}

export default Users
