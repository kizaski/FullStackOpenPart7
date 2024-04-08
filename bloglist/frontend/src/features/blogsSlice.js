import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const initialState = []

const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  let blogs = await blogsService.getAll()
  blogs = blogs.sort((a, b) => b.likes - a.likes)
  return blogs
})

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state, action) => {
        // Handle pending state
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        // Handle rejected state
      })
  },
})

export const { setBlogs: setBlogsAction } = blogsSlice.actions

export { fetchBlogs }

export default blogsSlice.reducer
