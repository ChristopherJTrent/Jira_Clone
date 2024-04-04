import Navbar from './components/Navbar.jsx'
import { Outlet } from 'react-router-dom'
import './layout.css'

function Layout() {

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
