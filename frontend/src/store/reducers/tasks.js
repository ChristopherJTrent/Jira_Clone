
export const RECEIVE_TASKS = 'tasks/RECEIVE_TASKS'

export const mockTasks = () => ({
	type: RECEIVE_TASKS,
	tasks: [
		{
			
		}
	]
})

export default function tasksReducer(state = {}, action) {
	switch(action.type) {
	default: return state
	}
}