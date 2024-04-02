
import ProjectTable from '../components/ProjectTable.jsx'
import './home.css'

export default function Home() {



	return <div className='projectsContainer'>
		<div className='headerContainer'>
			<h3>Projects</h3>
			<button id='createProjectButton'>Create Project</button>
		</div>
		<div>
			<input type='text' placeholder='Search Projects'/>
			<select>
				<option value='Jira'>Jira</option>
			</select>
		</div>
		<ProjectTable />
	</div>
	
	// <ul>
	// 	{posts.map((v, i) => <li key={i}>
	// 		<h1>{v.title}</h1>
	// 		<p>{v.id}</p>
	// 	</li>)}
	// </ul>
}