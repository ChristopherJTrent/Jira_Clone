import {createSelector} from 'reselect'
import { projectSelector } from './project.js'

export const selectEpicById = epicId => state => state.epics[epicId]
export const selectAllEpics = () => state => state.epics
export const selectEpicsForProject = projectId => createSelector(
	state => state.epics,
	epics => {
		const values = Object.values(epics)?.filter((v) => v.projectId === projectId)
		return values.length > 0 ? values : undefined
	}
)
export const selectParentOfEpic = epicId => createSelector(
	[projectSelector, selectEpicById(epicId)],
	(projects, epic) => projects.find(project => project.id === epic.projectId)
)