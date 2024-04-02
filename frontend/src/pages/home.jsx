
import { useState } from 'react'
import ProjectTable from '../components/ProjectTable.jsx'
import './home.css'

export default function Home() {
	const [searchTerm, setSearchTerm] = useState('')

	const clearSearch = (e) => {
		e.stopPropagation()
		setSearchTerm('')
	}
 
	return <div className='projectsContainer'>
		<div className='headerContainer'>
			<h3>Projects</h3>
			<button id='createProjectButton'>Create Project</button>
		</div>
		<div id='searchContainer'>
			<span id='searchBox'>
				<input
					type='text'
					placeholder='Search Projects'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}/>
				{searchTerm === '' 
				&& <span className='magGlass' >
					&#x2315;
				</span>
				|| <span onClick={clearSearch}>
					&#10539;
				</span>
				}
			</span>
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