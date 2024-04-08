import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { selectEpicsForProject } from '../../store/selectors/epics'
import { fetchEpics } from '../../store/reducers/epics'
export default function ShowProjectPage() {
	const dispatch = useDispatch()
	const {projectId} = useParams()
	const epics = useSelector(selectEpicsForProject(+projectId))
	if (! epics) {
		dispatch(fetchEpics())
	}
	return <>

	</>
}