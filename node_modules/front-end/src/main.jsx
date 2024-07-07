import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ModuleDetails } from './components/ModuleDetails/ModuleDetails.jsx'
import { getModules } from './api/getModules.js'
import { getModuleDetails } from './api/getModuleDetails.js'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		loader: getModules,
		// children: [
		// 	{
		// 		path: ':id',
		// 		element: <ModuleDetails />,
		// 		loader: getModuleDetails,
		// 	},
		// ],
	},
	{
		path: '/:id',
		element: <ModuleDetails />,
		loader: getModuleDetails,
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router}></RouterProvider>
	</React.StrictMode>
)
