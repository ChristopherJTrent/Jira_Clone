import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { selectEpicsForProject } from '../../store/selectors/epics'
import { fetchEpics } from '../../store/reducers/epics'
import Epic from '../../components/Epics/Epic'
import './show.css'
import { groupTasksForProject, selectTasksForProject } from '../../store/selectors/tasks.js'
export default function ShowProjectPage() {
	const dispatch = useDispatch()
	const {projectId} = useParams()
	const epics = useSelector(selectEpicsForProject(Number(projectId)))
	// mock data until tasks are implemented.
	const [todo, inProgress, done]= useSelector(groupTasksForProject(Number(projectId)))
	if (! epics) {
		dispatch(fetchEpics())
	}
	return <>
		<div id='kanbanHeader'>
			<div className='headerCard'>
				TO DO {todo.length}
			</div>
			<div className='headerCard'>
				IN PROGRESS {inProgress.length}
			</div>
			<div className='headerCard'>
				DONE {done.length}
			</div>
		</div>
		<div id='kanbanBody'>
			{
				epics?.map((v, i) => <Epic epic={v} key={i} />)
			}
		</div>
	</>
}