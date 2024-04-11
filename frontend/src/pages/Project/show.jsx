import { fetchEpics, postEpic } from '../../store/reducers/epics'
import {useDispatch, useSelector} from 'react-redux'
import Epic from '../../components/Epics/Epic'
import { groupTasksForProject } from '../../store/selectors/tasks.js'
import { selectEpicsForProject } from '../../store/selectors/epics'
import {useParams} from 'react-router-dom'
import { useState } from 'react'
import './show.css'
import { getProjectById } from '../../store/selectors/project.js'
export default function ShowProjectPage() {
	const dispatch = useDispatch()
	const {projectId} = useParams()
	const project = useSelector(getProjectById(projectId))
	const epics = useSelector(selectEpicsForProject(Number(projectId)))
	const [creatingNewEpic, setCreatingNewEpic] = useState(false)
	const [epicName, setEpicName] = useState('')
	const currentUserId = useSelector(state => state.session.currentUserId)
	// mock data until tasks are implemented.
	const [todo, inProgress, done]= useSelector(groupTasksForProject(Number(projectId)))
	if (! epics) {
		dispatch(fetchEpics())
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (epicName.length < 3) {
			return
		}
		dispatch(postEpic({title: epicName, projectId: Number(projectId)}))
		setEpicName('')
		setCreatingNewEpic(false)
	}

	return <div className='kanban'>
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
			{project.ownerId === currentUserId 
			&& ((creatingNewEpic) 
			&& <form className='createEpicForm'>
				<input type="text" value={epicName}
					onChange={(e) => setEpicName(e.target.value)} placeholder='New Epic Name'/>
				<button className='styled cancel' type="reset" onClick={() => {setCreatingNewEpic(false); setEpicName('')}}>cancel</button>
				<button className='styled confirm' onClick={handleSubmit}>Submit</button>
			</form>
			||<button className='epicCreationButton'
				onClick={() => setCreatingNewEpic(! creatingNewEpic)}>
				Create new Epic
			</button>)}
		</div>
	</div>
}