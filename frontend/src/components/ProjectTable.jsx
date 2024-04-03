/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import AutogenProfile from '../components/AutogenProfile.jsx'
import DeleteProjectConfirmationModal from './DeleteProjectConfirmationModal.jsx'
import { fetchProjects } from '../store/reducers/projects.js'
import { fetchUser } from '../store/reducers/user.js'
import HeaderStar from '../assets/header-star.svg?react'
import MenuDots from '../assets/menu-dots.svg?react'
import { projectSelector } from '../store/selectors/project.js'
import Star from '../assets/star.svg?react'

import './ProjectTable.css'

export default function ProjectTable({searchTerm}) {

	const dispatch = useDispatch()
	const posts = useSelector(projectSelector)
	const users = useSelector(state => state.users)

	const [dropdownState, setDropdownState] = useState({enabled: false, posY: 0, posNegX: 0})
	const [deleteConfirmation, setDeleteConfirmation] = useState(false)
	const [dropdownPost, setDropdownPost] = useState()
	/** @param {MouseEvent} event */
	const handleOpenDropdown = (post) => (event) => {
		event.preventDefault()
		/** @type {DOMRect} */
		const rect = event.currentTarget.getBoundingClientRect()
		setDropdownState({enabled: true, 
			posY: rect.bottom + 8, 
			posNegX: window.innerWidth - rect.right })
		setDropdownPost(post)
		console.log('inside handleOpenDropdown')
	}

	/** @param {MouseEvent} event */
	const handleCloseDropdown = (event) => {
		event.stopPropagation()
		setDropdownState({...dropdownState, enabled: false})
	}

	const deleteModalHandler = (event) => {
		event.stopPropagation()
		setDropdownState({...dropdownState, enabled: false})
		setDeleteConfirmation(true)
	}
	useEffect(() => {
		dispatch(fetchProjects())
	}, [])

	const generateTableRow = (post, i) => {
		const ownerName = users[post.ownerId]?.username
		return <tr key={i}>
			<td>
				<span className='starContainer'>
					<Star />
				</span>
			</td>
			<td>{post.title}</td>
			<td>{post.key}</td>
			<td>Team-managed software</td>
			<td><AutogenProfile name={ownerName ?? 'test user'} /> 
				<span className='leadName'>
					{ownerName ?? 'test user'}
				</span>
			</td>
			<td>
				<button onClick={handleOpenDropdown(post)}>
					<MenuDots />
				</button>
			</td>
		</tr>
	}

	return <>
		<DeleteProjectConfirmationModal
			enabled={deleteConfirmation}
			setEnabled={setDeleteConfirmation}
			post={dropdownPost} />
		<div id='projectDropdownContainer' 
			onClick={handleCloseDropdown} 
			hidden={!dropdownState.enabled}>
			<div className='projectManagementDropdown'
				//inline styles are not best practice. This is the minimum 
				//required to make the functionality work.
				style={{
					top: dropdownState.posY,
					right: dropdownState.posNegX
				}}>
				<a onClick={deleteModalHandler}>
					Delete project
				</a>
			</div>
		</div>
		<table>
			<thead>
				<tr>
					<td>
						<span className='starContainer'>
							<HeaderStar />
						</span>
					</td>
					<th>Name</th>
					<th>Key</th>
					<th>Type</th>
					<th>Lead</th>
					<th>More Actions</th>
				</tr>
			</thead>
			<tbody>
				{
					posts.map((post, i) => {
						if(searchTerm) {
							if(! post.title.toLowerCase()
								.includes(searchTerm.toLowerCase())) {
								return <></>
							}
						}
						if (!users[post.ownerId]) {
							dispatch(fetchUser(post.ownerId))
								.then(generateTableRow(post, i))
						} else {
							return generateTableRow(post, i)
						}
					})
				}
			</tbody> 
		</table>
	</>
}