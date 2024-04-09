
export const RECEIVE_TASKS = 'tasks/RECEIVE_TASKS'

export const mockTasks = () => ({
	type: RECEIVE_TASKS,
	tasks: [
		{
			id: 1,
			title: 'test epics',
			status: 'todo',
			type: 'task',
			parent_id: 1,
			parent_type: 'epic'
		},
		{
			id: 2,
			title: 'test project list',
			status: 'in_progress',
			type: 'task',
			parent_id: 1,
			parent_type: 'epic'
		},
		{
			id: 3,
			title: 'test login',
			status: 'complete',
			type: 'task',
			parent_id: 1,
			parent_type: 'epic'
		},
	]
})

export default function tasksReducer(state = {}, action) {
	switch(action.type) {
	case RECEIVE_TASKS: 
		return {...state, ...action.tasks.reduce((a, e) => {
			a[e.id] = e
			return a
		}, {})}
	default: return state
	}
}