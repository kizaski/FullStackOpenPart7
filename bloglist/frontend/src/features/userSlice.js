import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = null

const userLogin = createAsyncThunk('user/userLogin', async (credentials) => {
  return await loginService.login(credentials)
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      // console.log('action.payload: ', action.payload)
      blogService.setToken(action.payload?.token)
      return action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state, action) => {
        // Handle pending state
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(userLogin.rejected, (state, action) => {
        // Handle rejected state
      })
  },
})

export const { setUser } = userSlice.actions

export { userLogin }

export default userSlice.reducer
