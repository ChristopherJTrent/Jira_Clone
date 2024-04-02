import ProjectTable from '../components/ProjectTable.jsx'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './home.css'

export default function Home() {
	const navigate = useNavigate()
	const [searchTerm, setSearchTerm] = useState('')
	const clearSearch = (e) => {
		e.stopPropagation()
		setSearchTerm('')
	}
 
	return <div className='projectsContainer'>
		<div className='headerContainer'>
			<h3>Projects</h3>
			<button id='createProjectButton' onClick={() => navigate('/projects/new')}>Create Project</button>
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