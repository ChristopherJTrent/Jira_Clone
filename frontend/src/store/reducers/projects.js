import { csrfFetch } from '../../utils/csrfUtils.js'

export const RECEIVE_PROJECTS = 'projects/RECEIVE_PROJECTS'
export const RECEIVE_PROJECT = 'projects/RECEIVE_PROJECT'
export const REMOVE_PROJECT = 'projects/REMOVE_PROJECT'

export const receiveProjects = (projects) => (
	{
		type: RECEIVE_PROJECTS,
		projects
	}
)
export const receiveProject = (project) => (
	{
		type: RECEIVE_PROJECT,
		project
	}
)
export const removeProject = (projectId) => (
	{
		type: REMOVE_PROJECT,
		projectId
	}
)

export const fetchProjects = () => async dispatch => {
	const response = await fetch('/api/project')

	if (response.ok) {
		return dispatch(receiveProjects(await response.json()))
	}
}

export const postProject = (project) => async dispatch => {
	const response = await csrfFetch('/api/project', {
		method: 'POST',
		body: JSON.stringify(project)
	})
	if (response.ok) {
		return dispatch(receiveProject(await response.json()))
	} 
	return await response.json()
	
}

export const deleteProject = (projectId) => async dispatch => {
	const response = await csrfFetch(`/api/project/${projectId}`, {
		method: 'DELETE',
	})
	if (response.ok) {
		dispatch(removeProject(projectId))
	}
}

export const updateProject = (project) => async dispatch => {
	const response = await csrfFetch(`/api/project/${project.id}`, {
		method: 'PATCH',
		body: JSON.stringify(project)
	})
	if (response.ok) {
		return dispatch(receiveProject(await response.json()))
	}
}

export default function projectsReducer(state = {}, action) {
	switch(action.type) {
	case RECEIVE_PROJECT:
		return {...state, [action.project.id]: action.project}
	case RECEIVE_PROJECTS:
		return {...state,
			...(action.projects.reduce((a, e) => ({...a, [e.id]: e}), {}))}
	case REMOVE_PROJECT:
	{
		const newState = {...state}
		delete newState[action.projectId]
		return newState
	}
	default: return state
	}
}