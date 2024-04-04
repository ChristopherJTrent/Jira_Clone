import { Link, NavLink, Outlet, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from '../store/reducers/projects.js'
import './ProjectSettings.css'

export default function ProjectSettings() {
	const dispatch = useDispatch()
	const projectId = useParams().projectId
	const projects = useSelector(state => state.projects)
	
	if(projects[projectId] == null) {
		dispatch(fetchProjects())
	}

	const layout = <div id='pageContainer'>
		<div id='sidebarNav'>
			<NavLink to={`/projects/${projectId ?? 1}/settings/details`}>
				Details
			</NavLink>
		</div>
		<div id='settingsContainer'>
			<div id='settingsCard'>
				<div id='fancyNav'>
					<Link to='/projects'>Projects</Link>
					&nbsp;/&nbsp;
					<Link to={`/projects/${projectId}`}>
						{projects[projectId]?.title ?? 'Redux Broken'}
					</Link>
					&nbsp;/&nbsp;
					{<Link to={`/projects/${projectId}/settings/details`}>
						Project Settings
					</Link>}
				</div>
				<Outlet />	
			</div>
		</div>
	</div>


	
	
	return layout
}