import './EpicBody.css'

export default function EpicBody({tasks, collapsed}) {
	console.log(tasks)
	return <div className="tasksContainer">
		<div className="todoContainer">
			<ul>
				{tasks.filter((v) => v.status === 'todo').map((task, i) =>
					<li key={i} className='kanbanCard'>
						{task.title}
					</li>)}
				<li><button className=''>Create Issue</button></li>
			</ul>
		</div>
		<div className="inProgressContainer">
			<ul>
				{tasks.filter((v) => v.status === 'in_progress').map((task, i) =>
					<li key={i} className='kanbanCard'>
						{task.title}
					</li>)}
				<li><button className=''>Create Issue</button></li>
			</ul>
		</div>
		<div className="doneContainer">
			<ul>
				{tasks.filter((v) => v.status === 'complete').map((task, i) =>
					<li key={i} className='kanbanCard'>
						{task.title}
					</li>)}
				<li>
					<button className=''>Create Issue</button>
				</li>
			</ul>
		</div>
	</div>
}