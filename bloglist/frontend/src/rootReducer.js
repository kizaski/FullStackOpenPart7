import { combineReducers } from 'redux'

import notificationReducer from './features/notificationSlice'

const rootReducer = combineReducers({
  notification: notificationReducer,
})

export default rootReducer
