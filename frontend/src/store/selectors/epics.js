import {createSelector} from 'react-redux'

export const selectEpicById = epicId => state => state.epics[epicId]
export const selectAllEpics = () => state => state.epics
export const selectEpicsForProject = projectId => createSelector(
	state => state.epics,
	epics => epics.filter((v) => v.projectId === projectId)
)