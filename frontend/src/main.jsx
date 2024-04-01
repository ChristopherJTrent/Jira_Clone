import configureStore from './store/store.js'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { restoreSession } from './utils/csrfUtils.js'
import router from './router.jsx'
import { RouterProvider } from 'react-router-dom'
import './main.css'


const initializeApp = () => {
	const store = configureStore()
	ReactDOM.createRoot(document.getElementById('root')).render(
		<React.StrictMode>
			<Provider store={store}>
				<RouterProvider router={router}>
			
				</RouterProvider>
			</Provider>
		</React.StrictMode>,
	)
}

restoreSession().then(initializeApp)