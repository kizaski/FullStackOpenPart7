import { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, deleteBlog, updateBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const updatedBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: likes + 1,
    id: blog.id,
  }

  const addLike = () => {
    setLikes(likes + 1)
    updateBlog(updatedBlog)
  }

  return (
    <div className="pb-4">
      <div className="blog-title">
        <Link className="mx-2 underline" to={`/blogs/${blog.id}`}>
          <span>{blog.title}</span>
        </Link>
        <button
          className="rounded-md px-2 outline-double"
          onClick={() => setVisible(!visible)}
        >
          {visible ? 'hide' : 'show'}
        </button>
      </div>
      <br />
      {visible && (
        <div className="p-2">
          <div>
            <a
              className="after:content-['↗️']"
              target="_blank"
              rel="noreferrer"
              href={blog.url}
            >
              {blog.url}
            </a>{' '}
            <br />
          </div>
          <div className="blog-likes">
            likes: <span>{likes}</span>
            <button
              className="ml-3 rounded-md px-1 outline-double"
              onClick={addLike}
            >
              like
            </button>
            <br />
          </div>
          <div className="blog-author">
            Author: <span>{blog.author}</span> <br />
          </div>
          {user && blog.user && blog.user.username === user.username && (
            <div>
              <button
                className="blog-delete-btn m-2 rounded-md px-2 py-1 outline-double"
                onClick={() => deleteBlog(blog.id, blog)}
              >
                delete blog
              </button>
              <br />
            </div>
          )}
        </div>
      )}
      <div className="flex-grow border-t border-gray-400 p-2"></div>
    </div>
  )
}

export default Blog
