import { Link, Outlet, useParams } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { fetchProjects } from '../store/reducers/projects'
export default function ProjectPage() {

	const dispatch = useDispatch()
	const projectId = useParams().projectId
	const projects = useSelector(state => state.projects)

	if (projects == null || projects[projectId] == null) {
		dispatch(fetchProjects())
		return <></>
	}
	return <div id='pageContainer'>
		<div id='settingsContainer'>
			<div id='settingsCard'>
				<div id='fancyNav'>
					<Link to='/projects'>Projects</Link>
					&nbsp;/&nbsp;
					<Link to={`/projects/${projectId}`}>
						{(projects[projectId].title) ?? ''}
					</Link>
				</div>
				<Outlet />
			</div>
		</div>
	</div>
}