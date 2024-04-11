import {combineReducers} from 'redux'
import epicsReducer from './epics.js'
import projectsReducer from './projects.js'
import sessionReducer from './session.js'
import tasksReducer from './tasks.js'
import userReducer from './user.js'
const rootReducer = combineReducers({
	users: userReducer,
	session: sessionReducer,
	projects: projectsReducer,
	epics: epicsReducer,
	tasks: tasksReducer
})

export default rootReducer