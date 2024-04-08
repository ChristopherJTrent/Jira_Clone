import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { selectEpicsForProject } from '../../store/selectors/epics'
import { fetchEpics } from '../../store/reducers/epics'
import EpicHeader from '../../components/Epics/EpicHeader'
export default function ShowProjectPage() {
	const dispatch = useDispatch()
	const {projectId} = useParams()
	const epics = useSelector(selectEpicsForProject(+projectId))
	// mock data until tasks are implemented.
	const [todo, inProgress, done] = [[1,2],[],[]] 
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
				epics?.map((v, i) => <EpicHeader epic={v} key={i} />)
			}
		</div>
	</>
}