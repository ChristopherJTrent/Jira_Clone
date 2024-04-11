import TaskIcon from '../../assets/task-icon.svg?react'

import './EpicBody.css'

function generateTasks(tasks, status) {
	return <>
		{tasks.filter((v) => v.status === status).map((task, i) =>
			<li key={i} className='kanbanCard'>
				<div>
					{task.title}
				</div>
				<div>
					<TaskIcon/> {task.key}
				</div>
			</li>)}
	</>
}

export default function EpicBody({tasks, collapsed}) {
	return <div className={'tasksContainer' + (collapsed ? ' collapsed' : '')}>
		<div className="todoContainer">
			<ul>
				{generateTasks(tasks, 'todo')}
				<li><button className='issueButton' disabled={true}>Create Issue</button></li>
			</ul>
		</div>
		<div className='inProgressContainer'>
			<ul>
				{generateTasks(tasks, 'in_progress')}
				<li><button className='issueButton' disabled={true}>Create Issue</button></li>
			</ul>
		</div>
		<div className='doneContainer'>
			<ul>
				{generateTasks(tasks, 'complete')}
				<li>
					<button className='issueButton' disabled={true}>Create Issue</button>
				</li>
			</ul>
		</div>
	</div>
}