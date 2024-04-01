import { deleteSession, postSession } from '../../utils/apiUtils.js'
import { receiveUser } from './user.js'

export const SET_CURRENT_USER = 'session/SET_CURRENT_USER'
export const DELETE_CURRENT_USER = 'session/DELETE_CURRENT_USER'

export const setCurrentUser = (userId) => (
	{
		type: SET_CURRENT_USER,
		userId
	}
)

export const deleteCurrentUser = () => (
	{
		type: DELETE_CURRENT_USER
	}
)

export const logIn = (user) => async (dispatch, getState) => {
	const response = await postSession({email: user.email, password: user.password})
	if (response.ok) {
		const data = (await response.json()).user
		if (data.id == null) throw new Error('received invalid response from server')
		if(data.id && !(getState()?.users[data.id])) {
			const userResponse = await fetch(`/api/users/${data.id}`)
			const userData = await userResponse.json()
			dispatch(receiveUser(await userData.user))
		}
		return dispatch(setCurrentUser(data.id))
	}
	throw new Error()
} 

export const logOut = () => async (dispatch) => {
	const response = await deleteSession()

	if (response.ok) {
		
		return dispatch(deleteCurrentUser())
	}
}

export default function sessionReducer(state = {}, action) {
	switch (action.type) {
	case SET_CURRENT_USER:
		return {...state, currentUserId: action.userId}
	case DELETE_CURRENT_USER: 
		return {...state, currentUserId: undefined}
	default: return state
	}
}