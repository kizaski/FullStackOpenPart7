import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './features/notificationSlice'
import blogsReducer from './features/blogsSlice'
import userReducer from './features/userSlice'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
})

export default store
