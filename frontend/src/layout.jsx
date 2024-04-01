import Navbar from './components/Navbar.jsx'
import { Outlet } from 'react-router-dom'
import './layout.css'

function Layout() {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	)
}

export default Layout
