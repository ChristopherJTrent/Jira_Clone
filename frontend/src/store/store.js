import { applyMiddleware, compose, legacy_createStore } from 'redux'
import logger from 'redux-logger'
import rootReducer from './reducers/root.js'
import {thunk} from 'redux-thunk'
import { receiveUser } from './reducers/user.js'
import { setCurrentUser } from './reducers/session.js'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const middleware = composeEnhancers(applyMiddleware(thunk, logger))

const configureStore = (initialState = {}) => {
	const store = legacy_createStore(rootReducer, initialState, middleware)
	const user = JSON.parse(sessionStorage.getItem('currentUser'))
	store.dispatch(receiveUser(user))
	store.dispatch(setCurrentUser(user.id))
	return store
}

export default configureStore