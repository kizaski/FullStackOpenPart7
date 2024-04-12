import { useState, useEffect } from 'react'
import commentsService from '../services/comments'
import blogsService from '../services/blogs'
import { Link, Route, Routes, useParams } from 'react-router-dom'
import { setNotificationWithTimeout } from '../features/notificationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { createComment, fetchComments } from '../features/commentsSlice'

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

  return (
    <div key={id}>
      <h1>{blog?.title}</h1>
      <ul>
        <li>Author: {blog?.author}</li>
        <li>likes: {blog?.likes}</li>
        <button>like</button>
        <li>url: {blog?.url}</li>
      </ul>
      <h2>comments</h2>
      <input
        type="text"
        value={commentVal}
        name="Comment"
        onChange={({ target }) => setCommentVal(target.value)}
      />
      <button onClick={handleSubmitComment}>add comment</button>
      <ul>
        {comments?.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogView
