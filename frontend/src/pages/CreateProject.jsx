import { useEffect, useState } from 'react'
import Jira from '../assets/jira-header.svg?react'
import Kanban from '../assets/kanban.svg?react'
import TeamManaged from '../assets/team-managed.svg?react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './CreateProject.css'
import { postProject } from '../store/reducers/projects.js'

export default function CreateProject() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [name, setName] = useState('')
	const [key, setKey] = useState('')
	const [errors, setErrors] = useState()

	useEffect(() => {
		if(!name.trim().includes(' ')) {
			setKey(name.slice(0, 3).toUpperCase())
		} else {
			setKey(name.split(' ')
				.map((v) => v[0])
				.slice(0, 3)
				.join('')
				.toUpperCase())
		}
	}, [name])

	const handleSubmit = () => {
		dispatch(postProject({title: name, key})).then((v) => {
			if(v.status === 500){
				setErrors(`Cannot create project with duplicate title "${name}"`)
			} else {
				navigate('/projects')
			}
		})
	}

	const handleClose = (e) => {
		e.stopPropagation()
		navigate(-1)
	}
	return (
		<div className='createProjectModal'>
			<div className='closeButton' onClick={handleClose}>
				&#10539;
			</div>
			<div id='formOuterContainer'>
				<div id='createFormContainer'>
					<div id='formBody'>
						<form>
							<h1>Add project details</h1>
							<p>
								Explore what&apos;s possible when you collaborate with your team.
								Edit project details anytime in project settings.
							</p>
							<label htmlFor="name">Name<span className='red'>*</span></label>
							<input type='text'
								id='name'
								placeholder='Try a team name, project goal, milestone...'
								value={name}
								onChange={e => setName(e.target.value)}
							/>
							<span>
								<span className='bold'>Access</span>Only you may administer this project. Anyone you add as a member can access it.
							</span>
							<label htmlFor="key">Key<span className='red'>*</span></label>
							<input type='text'
								id='key'
								value={key}
								onChange={e => setKey(e.target.value.slice(0,3).toUpperCase())}
							/>
						</form>
					</div>
					<div id='templateContainer'>
						<div className='templateHeader'>
							<span>Template</span>
						</div>
						<div className='templateCard'>
							<div className='templateContent'>
								<div className='templateSplash'>
									<Kanban />
								</div>
								<div className='templateDescription'>
									<h4>Kanban</h4>
									<Jira />
									<p>Visualize and advance your project forward using issues on a powerful board</p>
								</div>
							</div>
						</div>
						<div className='templateHeader'>
							<span>Type</span>
						</div>
						<div className='templateCard'>
							<div className='templateContent'>
								<div className='templateSplash purple'>
									<TeamManaged />
								</div>
								<div className='templateDescription'>
									<h4>Team-managed</h4>
									<p>Control your own working processes and practices in a self-contained space.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr />
				<div id='bottomButtonContainer'>
					<button id='cancelButton'>Cancel</button>
					<button id='createProjectButton' onClick={handleSubmit}>Next</button>
				</div>
				<span className='red'>{errors}</span>
			</div>
		</div>
	)
}