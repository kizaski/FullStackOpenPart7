import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import commentsService from '../services/comments'

const initialState = []

const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (blogId) => {
    let comments = await commentsService.getAll(blogId)
    return comments
  },
)

const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ comment, blogId }) => {
    const newComment = await commentsService.create(blogId, {
      content: comment,
    })
    return newComment
  },
)

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(createComment.fulfilled, (state, action) => {
        return [...state, action.payload]
      })
  },
})

export { fetchComments, createComment }

export default commentsSlice.reducer
