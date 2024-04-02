import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from '../store/reducers/projects.js'
import { fetchUser } from '../store/reducers/user.js'
import HeaderStar from '../assets/header-star.svg?react'
import MenuDots from '../assets/menu-dots.svg?react'
import { projectSelector } from '../store/selectors/project.js'
import Star from '../assets/star.svg?react'
import { useEffect } from 'react'
import AutogenProfile from '../components/AutogenProfile.jsx'

export default function Home() {
	const dispatch = useDispatch()
	const posts = useSelector(projectSelector)
	const users = useSelector(state => state.users)

	useEffect(() => {
		dispatch(fetchProjects())
	}, [])

	console.log(posts)
	console.log(users)

	const generateTableRow = (post, i) => {
		const ownerName = users[post.ownerId]?.username
		return <tr key={i}>
			<td>
				<Star />
			</td>
			<td>{post.title}</td>
			<td>{post.key}</td>
			<td>Team-managed software</td>
			<td><AutogenProfile name={ownerName ?? 'test user'} /> {ownerName ?? 'test user'}</td>
			<td><MenuDots /></td>
		</tr>
	}

	return <table>
		<thead>
			<tr>
				<td><HeaderStar /></td>
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
	
	// <ul>
	// 	{posts.map((v, i) => <li key={i}>
	// 		<h1>{v.title}</h1>
	// 		<p>{v.id}</p>
	// 	</li>)}
	// </ul>
}