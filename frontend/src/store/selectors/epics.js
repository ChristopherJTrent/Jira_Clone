import {createSelector} from 'reselect'

export const selectEpicById = epicId => state => state.epics[epicId]
export const selectAllEpics = () => state => state.epics
export const selectEpicsForProject = projectId => createSelector(
	state => state.epics,
	epics => {
		const values = Object.values(epics)?.filter((v) => v.projectId === projectId)
		return values.length > 0 ? values : undefined
	}
)