import {csrfFetch} from '../../utils/csrfUtils.js'

export const RECEIVE_EPICS = 'epics/RECEIVE_EPICS'
export const RECEIVE_EPIC = 'epics/RECEIVE_EPIC'
export const REMOVE_EPIC = 'epics/REMOVE_EPIC'

export const receiveEpics = (epics) => (
	{
		type: RECEIVE_EPICS,
		epics
	}
)
export const receiveEpic = (epic) => (
	{
		type: RECEIVE_EPIC,
		epic
	}
)
export const removeEpic = (epicId) => (
	{
		type:REMOVE_EPIC,
		epicId
	}
)

export const fetchEpics = () => async dispatch => {
	const response = await fetch('/api/epic')

	if (response.ok) {
		return dispatch(receiveEpics(await response.json()))
	}
}

export const deleteEpic = (epicId) => async dispatch => {
	const response = await csrfFetch(`/api/epic/${epicId}`, {
		method: 'DELETE'
	})

	if (response.ok) {
		return dispatch(removeEpic(epicId))
	}
}

export const updateEpic = (epic) => async dispatch => {
	const response = await csrfFetch(`/api/epic/${epic.id}`, {
		method: 'PUT',
		body: JSON.stringify(epic)
	})
	
	if (response.ok) {
		dispatch(receiveEpic(await response.json()))
	}
}

export const postEpic = (epic) => async dispatch => {
	const response = await csrfFetch('/api/epic', {
		method: 'POST',
		body: JSON.stringify(epic)
	})
	
	if (response.ok) {
		dispatch(receiveEpic(await response.json()))
	}
}

export default function epicsReducer(state = {}, action) {

	switch (action.type) {
	case RECEIVE_EPICS: 
		return ({...state, 
			...action.epics.reduce(
				(a, e) => ({...a, [e.id]: e}), {}
			)
		})
	case RECEIVE_EPIC:
		return {...state, [action.epic.id]: action.epic}
	case REMOVE_EPIC: {
		const newState = {...state}
		delete newState[action.epicId]
		return newState
	}
	default: return state
	}
}