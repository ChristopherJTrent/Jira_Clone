import { applyMiddleware, compose, legacy_createStore } from 'redux'
import logger from 'redux-logger'
import rootReducer from './reducers/root.js'
import {thunk} from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const middleware = composeEnhancers(applyMiddleware(thunk, logger))

const configureStore = (initialState = {}) => (
	legacy_createStore(rootReducer, initialState, middleware)
)

export default configureStore