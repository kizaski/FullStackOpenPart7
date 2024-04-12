import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'

const initialState = null

const userLogin = createAsyncThunk('user/userLogin', async (credentials) => {
  return await loginService.login(credentials)
})

const userSignup = createAsyncThunk('user/userSignup', async (user) => {
  return await userService.createUser(user)
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
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

export { userLogin, userSignup }

export default userSlice.reducer
