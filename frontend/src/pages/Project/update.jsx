
import { fetchProjects, updateProject } from '../../store/reducers/projects.js'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './update.css'

export default function UpdateProjectPage() {
	const dispatch = useDispatch()

	const projectId = useParams().projectId
	const project = useSelector(state => state.projects[projectId])

	if (project == null) {
		dispatch(fetchProjects())
	}

	const [name, setName] = useState('')
	const [key, setKey] = useState('')

	useEffect(() => {
		if (project){
			setName(project.title)
			setKey(project.key)
		} 
	}, [project])


	return <>
		<div>
			<h1>Details</h1>
		</div>
		<form className='styled'>
			<label htmlFor="name">Name <span className='red'>*</span></label>
			<input type="text" id='name' value={name ?? 'loading...'} onChange={e => setName(e.target.value)} required={true}/>
			<label htmlFor="key">Key <span className='red'>*</span></label>
			<input type='text' id='key' value={key ?? 'LD'} onChange={e => setKey(e.target.value.toUpperCase().slice(0,3))} required={true}/>
			<button 
				className='styled cancel'
				onClick={(e) => {
					e.preventDefault()
					dispatch(updateProject({id: projectId, title: name, key}))
				}}
				disabled={project?.title === name && project?.key === key}
			>Save</button>
		</form>
	</>
}