
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
			parent_type: 'epic',
			key: 'TP-1'
		},
		{
			id: 2,
			title: 'test project list',
			status: 'in_progress',
			type: 'task',
			parent_id: 1,
			parent_type: 'epic',
			key: 'TP-2',
		},
		{
			id: 3,
			title: 'test login',
			status: 'complete',
			type: 'task',
			parent_id: 1,
			parent_type: 'epic',
			key: 'TP-3'
		},
		{
			id: 4,
			title: 'test epics',
			status: 'todo',
			type: 'task',
			parent_id: 2,
			parent_type: 'epic',
			key: 'TP-4'
		},
		{
			id: 5,
			title: 'test project list',
			status: 'in_progress',
			type: 'task',
			parent_id: 2,
			parent_type: 'epic',
			key: 'TP-5'
		},
		{
			id: 6,
			title: 'test login',
			status: 'complete',
			type: 'task',
			parent_id: 2,
			parent_type: 'epic',
			key: 'TP-6'
		},
		{
			id: 7,
			title: 'test epics',
			status: 'todo',
			type: 'task',
			parent_id: 3,
			parent_type: 'epic',
			key: 'TP-7'
		},
		{
			id: 8,
			title: 'test project list',
			status: 'in_progress',
			type: 'task',
			parent_id: 3,
			parent_type: 'epic',
			key: 'TP-8'
		},
		{
			id: 9,
			title: 'test login',
			status: 'complete',
			type: 'task',
			parent_id: 3,
			parent_type: 'epic',
			key: 'TP-9'
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