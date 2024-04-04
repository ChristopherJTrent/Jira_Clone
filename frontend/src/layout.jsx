import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from './store/reducers/projects.js'
import Navbar from './components/Navbar.jsx'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import './layout.css'

function Layout() {
	const dispatch = useDispatch()
	const projects = useSelector(state => state.projects)
	const userId = useSelector(state => state.session.currentUserId)
	useEffect(() => {
		if (userId && Object.values(projects).length === 0) {
			dispatch(fetchProjects())
		}
	})
	return (
		<>
			<Navbar />
			<div id='contentContainer'>
				<Outlet />
			</div>
		</>
	)
}

export default Layout
