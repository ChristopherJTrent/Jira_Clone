import { deleteSession, postSession } from '../../utils/apiUtils.js'

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

export const logIn = (user) => async dispatch => {
	const response = await postSession({email: user.email, password: user.password})

	if (response.ok) {
		return dispatch(setCurrentUser(user.id))
	}
} 

export const logOut = () => async dispatch => {
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