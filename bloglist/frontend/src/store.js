import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './features/notificationSlice'
import blogsReducer from './features/blogsSlice'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
  },
})

export default store
