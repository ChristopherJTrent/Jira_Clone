import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import { useEffect } from 'react'
import {useSelector} from 'react-redux'
import './layout.css'

function Layout() {

	const currentUser = useSelector(state => state.session.currentUserId)
	const navigate = useNavigate()

	useEffect(() => {
		if (! currentUser) {
			navigate('/')
		}
	}, [currentUser])

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
