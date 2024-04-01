import { useDispatch, useSelector } from 'react-redux'
import JiraHeader from '../assets/jira-header.svg?react'
import { logOut } from '../store/reducers/session.js'
import { NavLink } from 'react-router-dom'
import { userIdSelector } from '../store/selectors/session.js'
import './Navbar.css'
export default function Navbar() {
	const currentUserId = useSelector(userIdSelector)
	const dispatch = useDispatch()
	return <nav>
		<ul>
			<li>
				<JiraHeader />
			</li>
			<li className="floatRight">
				{currentUserId == null 
				&& <NavLink to='/login'>Sign In</NavLink>
				|| <button onClick={dispatch(logOut())}>
					Log Out
				</button>
				}		
			</li>
		</ul>
	</nav>
}