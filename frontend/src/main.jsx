import React from 'react'
import ReactDOM from 'react-dom/client'
import { restoreSession } from './utils/csrfUtils.js'
import router from './router.jsx'
import { RouterProvider } from 'react-router-dom'
import './index.css'

const initializeApp = () => {
	ReactDOM.createRoot(document.getElementById('root')).render(
		<React.StrictMode>
			<RouterProvider router={router}>
		
			</RouterProvider>
		</React.StrictMode>,
	)
}

restoreSession().then(initializeApp)