import Collapse from '../../assets/collapse-image.svg?react'
import { updateEpic } from '../../store/reducers/epics.js'
import {useDispatch} from 'react-redux'
import { useState } from 'react'
import './EpicHeader.css'


export default function EpicHeader({epic, collapsed, setCollapsed, tasks}) {
	const dispatch = useDispatch()
	const [epicName, setEpicName] = useState(epic.title)
	const [isEditingName, setIsEditingName] = useState(false)

	const handleSubmit = e => {
		e.preventDefault()
		if (epic.title !== epicName) {
			dispatch(updateEpic({...epic, title: epicName}))
		}
		setIsEditingName(false)
	}

	return <div className='kanbanHeader'>
	
		<button onClick={(e) => {
			e.preventDefault()
			setCollapsed(!collapsed)
		}} className={'collapseButton' + (collapsed ? ' collapsed' : '')}>
			<Collapse />
		</button>
		<button className='titleButton'>
			<input type='text'
				className='epicTitle'
				value={epicName}
				onChange={e => setEpicName(e.target.value)}
				disabled={!isEditingName}/>
			{isEditingName && <button 
				onClick={handleSubmit}
				className='saveButton'>Save</button>
				|| <button 
					onClick={() => setIsEditingName(true)}
					className='editButton'>🖉</button>}
			<span className='issueDisplay'>
				({`${tasks.length === 0 ? 
					'no' : 
					tasks.length} issue${tasks.length === 1 ? '' : 's'}`})
			</span>
			<span className='todoMarker'>TO DO</span>
		</button>
	</div>
}