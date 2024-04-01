import { postUser } from '../../utils/apiUtils.js'

export const RECEIVE_USER = 'users/RECEIVE_USER'
export const RECEIVE_USERS = 'users/RECEIVE_USERS'
export const REMOVE_USER = 'users/REMOVE_USER'

export const receiveUser = (user) => (
	{
		type: RECEIVE_USER,
		user
	}
)
export const receiveUsers = (users) => (
	{
		type: RECEIVE_USERS,
		users
	}
)
export const removeUser = (userId) => (
	{
		type: REMOVE_USER,
		userId
	}
)

export const createUser = (user) => async dispatch => {
	const response = await postUser(user)

	if (response.ok) {
		const data = await response.json()
		return dispatch(receiveUser(data.user))
	}
}

export default function userReducer(state = {}, action) {

	switch (action.type) {
	case RECEIVE_USER:
		return {...state, [action.user['id']]: action.user}
	case RECEIVE_USERS:
		return {...state,
			...(action.users.reduce((a, e) => ({...a, [e.id]: e}), {}))
		}
	case REMOVE_USER:
	{
		const newState = {...state}
		delete newState[action.userId]
		return newState
	}
	default: return state
	}
}