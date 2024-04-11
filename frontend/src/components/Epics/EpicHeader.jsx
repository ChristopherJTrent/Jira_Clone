import { deleteEpic, updateEpic } from '../../store/reducers/epics.js'
import Collapse from '../../assets/collapse-image.svg?react'
import {useDispatch, useSelector} from 'react-redux'
import { useState } from 'react'
import './EpicHeader.css'
import { selectParentOfEpic } from '../../store/selectors/epics.js'
import useFocus from '../../utils/useFocus.js'


export default function EpicHeader({epic, collapsed, setCollapsed, tasks}) {
	const dispatch = useDispatch()
	const [epicName, setEpicName] = useState(epic.title)
	const [isEditingName, setIsEditingName] = useState(false)
	const [modalState, setModalState] = useState({active: false})
	const currentUserId = useSelector(state => state.session.currentUserId)
	const parentProject = useSelector(selectParentOfEpic(epic.id))
	const [focusRef, setFocus] = useFocus()

	const handleSubmit = e => {
		e.preventDefault()
		if (epic.title !== epicName) {
			dispatch(updateEpic({...epic, title: epicName}))
		}
		setIsEditingName(false)
	}

	const handleDelete = e => {
		e.preventDefault()
		setModalState({...modalState, active:false})
		dispatch(deleteEpic(epic.id))
	}

	return <div className='kanbanHeader'>
		{modalState.active && <div className='modalContainer'>
			<div className='modalBody'>
				Are you sure you want to delete this epic &ldquo;{epic.title}&rdquo;? this action cannot be undone.
				<div className='buttonContainer'>
					<button className='styled cancel'
						onClick={() => setModalState({...modalState, active: false})}>Cancel
					</button>
					<button className='styled danger'
						onClick={handleDelete}>Delete
					</button>
				</div>
			</div>
		</div>}
		<button onClick={(e) => {
			e.preventDefault()
			setCollapsed(!collapsed)
		}} className={'collapseButton' + (collapsed ? ' collapsed' : '')}>
			<Collapse />
		</button>
		<input type='text'
			className='epicTitle'
			value={epicName}
			onChange={e => {
				e.preventDefault()
				setEpicName(e.target.value)
			}}
			disabled={!isEditingName}
			ref={focusRef}
			onKeyDown={(e) => {
				if (e.key === 'Enter') {
					handleSubmit(e)
				}
			}}/>
		{isEditingName && <button 
			onClick={handleSubmit}
			className='saveButton'>Save</button>
			|| <button 
				onClick={() => {
					setIsEditingName(true)
					//this doesn't work if you do it immediately.
					setTimeout(() => setFocus(), 1)
				}}
				className='editButton'>🖉</button>}
		<span className='issueDisplay'>
			({`${tasks.length === 0 ? 
				'no' : 
				tasks.length} issue${tasks.length === 1 ? '' : 's'}`})
		</span>
		<span className='todoMarker'>TO DO</span>
		{currentUserId === parentProject.ownerId 
		&& <span className='floatRight'>
			<button className='styled danger noBackground'
				onClick={() => setModalState({...modalState, active: true})}>
				Delete Epic
			</button>
		</span>}
	</div>
}