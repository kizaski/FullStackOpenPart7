import { useState, useEffect } from 'react'
import commentsService from '../services/comments'
import blogsService from '../services/blogs'
import { Link, Route, Routes, useParams } from 'react-router-dom'
import { setNotificationWithTimeout } from '../features/notificationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { createComment, fetchComments } from '../features/commentsSlice'
import { updateBlog } from '../features/blogsSlice'

const BlogView = ({}) => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const [blog, setBlog] = useState()
  const [commentVal, setCommentVal] = useState()

  const comments = useSelector((state) => {
    const commentsCopy = [...state.comments]
    commentsCopy.reverse()
    return commentsCopy
  })

  useEffect(() => {
    dispatch(fetchComments(id))
  }, [dispatch, id])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await blogsService.getBlog(id)
        setBlog(response)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [id])

  const handleSubmitComment = async (event) => {
    event.preventDefault()
    try {
      dispatch(createComment({ comment: commentVal, blogId: blog.id }))
      dispatch(
        setNotificationWithTimeout({
          message: `Added comment ${commentVal}`,
          type: 'info',
          timeout: 3000,
        }),
      )
      setCommentVal('')
    } catch (exception) {
      dispatch(
        setNotificationWithTimeout({
          message: 'Cannot add comment',
          type: 'error',
          timeout: 3000,
        }),
      )
    }
  }

  const addLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(updateBlog(updatedBlog))
    setBlog(updatedBlog)
  }

  return (
    <div key={id} className="mx-6 max-w-md">
      <h1>{blog?.title}</h1>
      <ul>
        <li className="my-2">
          <span className="font-bold">Author:</span> {blog?.author}
        </li>
        <li className="my-2">
          <span>
            <span className="font-bold">likes:</span> {blog?.likes}
          </span>
          <button
            className="ml-3 rounded-md px-1 outline-double"
            onClick={addLike}
          >
            like
          </button>
        </li>
        <li className="my-2">
          <span className="font-bold">url:</span> {blog?.url}
        </li>
      </ul>
      <h2>comments</h2>
      <input
        type="text"
        value={commentVal}
        name="Comment"
        onChange={({ target }) => setCommentVal(target.value)}
      />
      <button
        className="blog-delete-btn m-2 rounded-md px-2 py-1 outline-double"
        onClick={handleSubmitComment}
      >
        add comment
      </button>
      <ul>
        {comments?.map((comment) => (
          <li key={comment.id}>
            {comment.content}
            <div className="flex-grow border-t border-gray-400 p-2"></div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogView
