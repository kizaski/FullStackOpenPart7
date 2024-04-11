import { useState, useEffect } from 'react'
import usersService from '../services/users'

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
          <div key={user.id}>
            <ul>
              <li>
                <span>{user.username}</span>
              </li>
              <li>
                name: <span>{user.name}</span>
              </li>
              <li>
                blogs created: <span>{user.blogs.length}</span>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Users
