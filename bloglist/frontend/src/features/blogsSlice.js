import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const initialState = []

const setBlogs = createAsyncThunk(
  'blogs/setBlogs',
  async ({ blogs }, { dispatch }) => {
    dispatch(setBlogsAction({ blogs }))
  },
)

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogsAction(state, action) {
      state.blogs = action.payload.blogs
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setBlogs.pending, (state, action) => {
        // Handle pending state
      })
      .addCase(setBlogs.fulfilled, (state, action) => {
        // Handle fulfilled state
      })
      .addCase(setBlogs.rejected, (state, action) => {
        // Handle rejected state
      })
  },
})

export const { setBlogsAction } = blogsSlice.actions

export { setBlogs }

export default blogsSlice.reducer
