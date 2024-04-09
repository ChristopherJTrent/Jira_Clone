import {createSelector} from 'reselect'
import { selectEpicsForProject } from './epics.js'

export const selectTasksForEpic = epicId => createSelector(
	state => state.tasks,
	tasks => Object.values(tasks)
		.filter((v) => v.parent_type === 'epic' && v.parent_id === epicId)
)
export const selectTasksForProject = projectId => createSelector(
	[state => state.tasks, selectEpicsForProject(projectId)],
	(tasks, epics) => (
		Object.values(tasks).filter((task) => Object.values(epics).some((v) => task.parent_id === v.id))
	)
)