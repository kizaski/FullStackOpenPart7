import { useState } from 'react'

const Blog = ({ username, name, blogs, id }) => {
  return (
    <div key={id}>
      <ul>
        <li>
          <span>{username}</span>
        </li>
        <li>
          name: <span>{name}</span>
        </li>
        <li>
          blogs created: <span>{blogs.length}</span>
        </li>
      </ul>
    </div>
  )
}

export default Blog
