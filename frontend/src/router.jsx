import {createBrowserRouter} from 'react-router-dom'
import Frontpage from './pages/frontpage.jsx'
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
				path: 'login',
				element: <Session/>
			},
			{
				path: 'register',
				element: <Session/>
			}
		]
	}
])

export default router