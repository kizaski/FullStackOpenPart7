import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './features/notificationSlice'
import blogsReducer from './features/blogsSlice'
import userReducer from './features/userSlice'
import commentsReducer from './features/commentsSlice'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
    comments: commentsReducer,
  },
})

export default store
