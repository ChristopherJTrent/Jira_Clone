import { Link, NavLink, Outlet, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './ProjectSettings.css'

export default function ProjectSettings() {
	const projectId = useParams().projectId
	const projects = useSelector(state => state.projects)
	if(projects[projectId] == null) return <></>
	
	
	return <div id='pageContainer'>
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
}