import JiraHeader from '../assets/jira-header.svg?react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
export default function Navbar() {

	return <nav>
		<ul>
			<li>
				<JiraHeader />
			</li>
			<li className="floatRight">
				<NavLink to='/login'>Sign In</NavLink>
			</li>
		</ul>
	</nav>
}