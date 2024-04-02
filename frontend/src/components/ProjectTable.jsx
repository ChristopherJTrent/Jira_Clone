import { useDispatch, useSelector } from 'react-redux'
import AutogenProfile from '../components/AutogenProfile.jsx'
import { fetchProjects } from '../store/reducers/projects.js'
import { fetchUser } from '../store/reducers/user.js'
import HeaderStar from '../assets/header-star.svg?react'
import MenuDots from '../assets/menu-dots.svg?react'
import { projectSelector } from '../store/selectors/project.js'
import Star from '../assets/star.svg?react'
import { useEffect } from 'react'

import './ProjectTable.css'

export default function ProjectTable() {

	const dispatch = useDispatch()
	const posts = useSelector(projectSelector)
	const users = useSelector(state => state.users)

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
			<td><MenuDots /></td>
		</tr>
	}

	return <table>
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
}