import { useLoaderData } from 'react-router-dom'
import { useGetDataFromSocket } from './hooks/useGetDataFromSocket'
import { ModuleRow } from './components/ModuleRow'

const App = () => {
	const modules = useLoaderData()
	const { messageFromSocket } = useGetDataFromSocket()
	const commonClass = 'my-4 p-1 sm:p-4 w-1/4'

	return (
		<div className='flex flex-col items-center m-1 sm:m-4 mt-8 shadow-md rounded-lg w-full text-xs sm:text-xl'>
			<div className='flex items-center justify-center mb-0 text-center w-full font-bold text-green-700 border-b-2 border-green-700'>
				<p className={commonClass}>Name</p>
				<p className={commonClass}>Available</p>
				<p className={commonClass}>Target Temperature</p>
				<p className={commonClass}>Temperature</p>
			</div>
			<ul className='w-full'>
				{modules.map(module => (
					<ModuleRow
						key={module.id}
						module={module}
						messageFromSocket={messageFromSocket}
					/>
				))}
			</ul>
		</div>
	)
}

export default App
