import {createBrowserRouter, Navigate, Outlet} from 'react-router-dom'
import CreateProject from './pages/Project/CreateProject.jsx'
import Frontpage from './pages/frontpage.jsx'
import Home from './pages/Project/home.jsx'
import Layout from './layout.jsx'
import ProjectSettings from './layouts/ProjectSettings.jsx'
import Session from './pages/session.jsx'
import UpdateProjectPage from './pages/Project/update.jsx'
import ShowProjectPage from './pages/Project/show.jsx'
import ProjectPage from './layouts/ProjectPage.jsx'
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
			{
				path: 'projects/:projectId',
				element: <ProjectPage />,
				children: [
					{
						path: '',
						element: <ShowProjectPage/>
					}
				]
			},
			{
				path: 'projects/:projectId/settings',
				element: <ProjectSettings />,
				children: [
					{path: 'details', element: <UpdateProjectPage />}
				]
			}
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