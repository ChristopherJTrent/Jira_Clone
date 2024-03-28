import { Outlet } from 'react-router-dom'
import './Layout.css'

function Layout() {
	return (
		<>
			<h1>Jira Clone</h1>
			<Outlet />
		</>
	)
}

export default Layout
