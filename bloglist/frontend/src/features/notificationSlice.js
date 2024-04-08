import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  type: '',
}

const setNotificationWithTimeout = createAsyncThunk(
  'notification/setNotificationWithTimeout',
  async ({ message, type, timeout }, { dispatch }) => {
    dispatch(setNotification({ message, type }))
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(clearNotification())
        resolve()
      }, timeout)
    })
  },
)

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state.message = action.payload.message
      state.type = action.payload.type
    },
    clearNotification(state) {
      state.message = null
      state.type = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setNotificationWithTimeout.pending, (state, action) => {
        // Handle pending state
      })
      .addCase(setNotificationWithTimeout.fulfilled, (state, action) => {
        // Handle fulfilled state
      })
      .addCase(setNotificationWithTimeout.rejected, (state, action) => {
        // Handle rejected state
      })
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export { setNotificationWithTimeout }

export default notificationSlice.reducer
