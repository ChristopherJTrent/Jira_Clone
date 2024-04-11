import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { selectEpicsForProject } from '../../store/selectors/epics'
import { fetchEpics, postEpic } from '../../store/reducers/epics'
import Epic from '../../components/Epics/Epic'
import './show.css'
import { groupTasksForProject, selectTasksForProject } from '../../store/selectors/tasks.js'
import { useState } from 'react'
export default function ShowProjectPage() {
	const dispatch = useDispatch()
	const {projectId} = useParams()
	const epics = useSelector(selectEpicsForProject(Number(projectId)))
	const [creatingNewEpic, setCreatingNewEpic] = useState(false)
	const [epicName, setEpicName] = useState('')
	// mock data until tasks are implemented.
	const [todo, inProgress, done]= useSelector(groupTasksForProject(Number(projectId)))
	if (! epics) {
		dispatch(fetchEpics())
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (epicName.length < 3) {
			return
		} else {
			dispatch(postEpic({title: epicName, projectId}))
		}
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
			{creatingNewEpic && <form className='createEpicForm'>
				<input type="text" value={epicName}
					onChange={(e) => setEpicName(e.target.value)} />
				<button type="reset" onClick={() => {setCreatingNewEpic(false); setEpicName('')}}>cancel</button>
				<button onClick={handleSubmit}>Submit</button>
			</form>
			||<button className='epicCreationButton'
				onClick={() => setCreatingNewEpic(! creatingNewEpic)}>
				Create new Epic
			</button>}
		</div>
	</>
}