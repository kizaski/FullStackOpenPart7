import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const initialState = []

const setBlogs = createAsyncThunk('blogs/setBlogs', async () => {
  const blogs = await blogsService.getAll()
  return blogs
})

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogsAction(state, action) {
      return action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setBlogs.pending, (state, action) => {
        // Handle pending state
      })
      .addCase(setBlogs.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(setBlogs.rejected, (state, action) => {
        // Handle rejected state
      })
  },
})

export const { setBlogsAction } = blogsSlice.actions

export { setBlogs }

export default blogsSlice.reducer
