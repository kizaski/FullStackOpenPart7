import { useState, useEffect } from 'react'
import blogsService from '../services/blogs'
import { Link, Route, Routes, useParams } from 'react-router-dom'

const BlogView = ({}) => {
  const { id } = useParams()

  const [blog, setBlog] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await blogsService.getBlog(id)
        console.log(response)
        setBlog(response)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [id])

  return (
    <div key={id}>
      <h1>{blog?.title}</h1>
      <ul>
        <li></li>
      </ul>
    </div>
  )
}

export default BlogView
