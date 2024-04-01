import { Outlet } from 'react-router-dom'
import './layout.css'
import Navbar from './components/Navbar.jsx'

function Layout() {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	)
}

export default Layout
