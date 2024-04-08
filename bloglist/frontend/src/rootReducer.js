import { combineReducers } from 'redux'

import notificationReducer from './features/notificationSlice'
import blogsReducer from './features/blogsSlice'

const rootReducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
})

export default rootReducer
