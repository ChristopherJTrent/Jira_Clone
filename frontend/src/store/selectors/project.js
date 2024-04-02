import { createSelector } from 'reselect'

export const projectSelector = createSelector(
	state => state.projects,
	projects => Object.values(projects)
)