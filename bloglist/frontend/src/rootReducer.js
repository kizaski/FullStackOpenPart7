import { combineReducers } from 'redux'

import notificationReducer from './features/notificationSlice'
import blogsReducer from './features/blogsSlice'
import userReducer from './features/userSlice'

const rootReducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  user: userReducer,
})

export default rootReducer
