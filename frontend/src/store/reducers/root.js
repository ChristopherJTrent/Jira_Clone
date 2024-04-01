import {combineReducers} from 'redux'
import sessionReducer from './session.js'
import userReducer from './user.js'
const rootReducer = combineReducers({
	users: userReducer,
	session: sessionReducer
})

export default rootReducer