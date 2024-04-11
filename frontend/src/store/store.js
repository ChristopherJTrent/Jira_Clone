import { applyMiddleware, compose, legacy_createStore } from 'redux'
import { receiveUser } from './reducers/user.js'
import rootReducer from './reducers/root.js'
import { setCurrentUser } from './reducers/session.js'
import {thunk} from 'redux-thunk'

let composeEnhancers = compose
if (import.meta.env['MODE'] === 'development'){
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}


const middleware = composeEnhancers(applyMiddleware(thunk))

const configureStore = (initialState = {}) => {
	const store = legacy_createStore(rootReducer, initialState, middleware)
	const user = JSON.parse(sessionStorage.getItem('currentUser'))
	user && store.dispatch(receiveUser(user))
	user && store.dispatch(setCurrentUser(user.id))
	return store
}

export default configureStore