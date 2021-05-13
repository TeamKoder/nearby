import { combineReducers } from 'redux'
import userReducer from './_reducer/reducer'

const rootReducer = combineReducers({
  data: userReducer
})

export default rootReducer
