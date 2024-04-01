import {combineReducers} from 'redux'
import projectsReducer from './projects.js'
import sessionReducer from './session.js'
import userReducer from './user.js'
const rootReducer = combineReducers({
	users: userReducer,
	session: sessionReducer,
	projects: projectsReducer
})

export default rootReducer