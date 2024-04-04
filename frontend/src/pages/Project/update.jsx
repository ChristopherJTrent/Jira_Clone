
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './update.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from '../../store/reducers/projects.js'

export default function UpdateProjectPage() {
	const dispatch = useDispatch()
	const projectId = useParams().projectId
	const project = useSelector(state => state.projects[projectId])

	const [name, setName] = useState('')
	const [key, setKey] = useState('')

	useEffect(() => {
		console.log(projectId)
		console.log(project)
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
			<input type="text" id='name' value={name} onChange={e => setName(e.target.value)}/>
			<label htmlFor="key">Key <span className='red'>*</span></label>
			<input type='text' id='key' value={key} onChange={e => setName(e.target.value.toUpperCase().slice(0,3))}/>

		</form>
	</>
}