import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AppSelectorIcon from '../assets/app-selector-icon.svg?react'
import AutogenProfile from './AutogenProfile.jsx'
import JiraHeader from '../assets/jira-header.svg?react'
import { logOut } from '../store/reducers/session.js'
import { userIdSelector } from '../store/selectors/session.js'
import './Navbar.css'
export default function Navbar() {
	const currentUserId = useSelector(userIdSelector)
	const currentUsername = useSelector(
		(state) => state.users[currentUserId]?.username
	)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleLogout = () => {
		dispatch(logOut())
		navigate('/')
	}

	return <div className='navbarContainer'>
		<header>
			<nav>
				<ul id='leftSegmentContainer'>
					<li>
						<AppSelectorIcon className='appSelector'/>
					</li>
					<li>
						<Link to='/'>
							<JiraHeader className='productIcon'/>
						</Link>
					</li>
					{currentUserId && <li>
						<NavLink to='/projects'>Projects</NavLink>
					</li>}
				</ul>
				<ul id='rightSegmentContainer'>

					<li className="floatRight">
						{currentUserId == null 
						&& <NavLink to='/login'>Sign In</NavLink>
						|| <AutogenProfile 
							name={currentUsername} 
							onClick={handleLogout}/>
						}		
					</li>
				</ul>
			</nav>
		</header>
	</div>
}