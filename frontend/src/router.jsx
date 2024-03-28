import {createBrowserRouter} from 'react-router-dom'
import Layout from './layout.jsx'
import Frontpage from './pages/frontpage.jsx'
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
				element: <Session type='login'/>
			},
			{
				path: 'register',
				element: <Session type='register' />
			}
		]
	}
])

export default router