import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const initialState = []

const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  let blogs = await blogsService.getAll()
  blogs = blogs.sort((a, b) => b.likes - a.likes)
  return blogs
})

const createBlog = createAsyncThunk(
  'blogs/createBlog',
  async (blog, thunkAPI) => {
    const { user } = thunkAPI.getState()
    blog.user = user.id

    const newBlog = await blogsService.create(blog)
    return newBlog
  },
)

const updateBlog = createAsyncThunk('blogs/updateBlog', async (blog) => {
  const newBlog = await blogsService.update(blog.id, blog)
  return newBlog
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
      .addCase(createBlog.fulfilled, (state, action) => {
        return [...state, action.payload]
      })
  },
})

export { fetchBlogs, createBlog, updateBlog }

export default blogsSlice.reducer
