import './EpicBody.css'

export default function EpicBody({epic}) {
	return <div className="tasksContainer">
		<div className="todoContainer">
			<ul>
				{/* placeholder for list generator */}
				<li><button>Create Issue</button></li>
			</ul>
		</div>
		<div className="inProgressContainer">
			<ul>
				{/* placeholder for list generator */}
				<li><button>Create Issue</button></li>
			</ul>
		</div>
		<div className="doneContainer">
			<ul>
				{/* placeholder for list generator */}
				<li>
					<button>Create Issue</button>
				</li>
			</ul>
		</div>
	</div>
}