import { combineReducers } from 'redux'

import notificationReducer from './features/notificationSlice'
import blogsReducer from './features/blogsSlice'
import userReducer from './features/userSlice'
import commentsReducer from './features/commentsSlice'

const rootReducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  user: userReducer,
  comments: commentsReducer,
})

export default rootReducer
