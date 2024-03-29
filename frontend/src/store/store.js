import { applyMiddleware, legacy_createStore } from 'redux'
import logger from 'redux-logger'
import rootReducer from './reducers/root.js'
import {thunk} from 'redux-thunk'

const configureStore = (initialState = {}) => (
	legacy_createStore(rootReducer, initialState, applyMiddleware(thunk, logger))
)

export default configureStore