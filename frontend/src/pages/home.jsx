import CreateProjectModal from '../components/CreateProjectModal.jsx'
import ProjectTable from '../components/ProjectTable.jsx'
import { useState } from 'react'
import './home.css'

export default function Home() {
	const [searchTerm, setSearchTerm] = useState('')

	const clearSearch = (e) => {
		e.stopPropagation()
		setSearchTerm('')
	}
 
	return <div className='projectsContainer'>
		<div className='modalContainer'>
			<CreateProjectModal />
		</div>
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
		<ProjectTable searchTerm={searchTerm}/>
	</div>
}