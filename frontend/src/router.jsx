import {createBrowserRouter, Navigate, Outlet} from 'react-router-dom'
import CreateProject from './pages/CreateProject.jsx'
import Frontpage from './pages/frontpage.jsx'
import Home from './pages/home.jsx'
import Layout from './layout.jsx'
import Session from './pages/session.jsx'
const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '',
				element: <Frontpage />
			},
			{
				path: 'projects',
				element: <Home />,
			},
		]
	},
	{
		path: '/',
		element: <Outlet />,
		children: [
			{
				path: 'login',
				element: <Session type='login' />
			},
			{
				path: 'register',
				element: <Session type='register' />
			},
			{
				path: 'projects/new',
				element: <CreateProject />
			}
		]
	},
	{path: '*', element:<Navigate to='/' />}
])

export default router