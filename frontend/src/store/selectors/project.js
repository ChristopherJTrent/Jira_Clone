import { createSelector } from 'reselect'

export const projectSelector = createSelector(
	state => state.projects,
	projects => Object.values(projects)
)
export const getProjectById = projectId => state => state.projects[projectId]