import { NavLink, useLoaderData } from 'react-router-dom'
import { useGetDataFromSocket } from './hooks/useGetDataFromSocket'

const App = () => {
	const modules = useLoaderData()
	const { messageFromSocket } = useGetDataFromSocket()

	return (
		<div className='flex flex-col items-center m-1 sm:m-4 mt-8 shadow-md rounded-lg w-full text-xs sm:text-xl'>
			<div className='flex items-center justify-center mb-0 text-center w-full font-bold text-green-700 border-b-2 border-green-700'>
				<p className='my-4 p-1 sm:p-4 w-1/4'>Name</p>
				<p className='my-4 p-1 sm:p-4 w-1/4'>Available</p>
				<p className='my-4 p-1 sm:p-4 w-1/4'>Target Temperature</p>
				<p className='my-4 p-1 sm:p-4 w-1/4'>Temperature</p>
			</div>
			<ul className='w-full'>
				{modules.map(module => {
					return (
						<li
							key={module.id}
							className='flex justify-between text-center border-b-2 border-green-200 last-of-type:border-b-0 hover:bg-green-100 '
						>
							<NavLink
								className='flex items-center justify-center my-4 sm:my-8 w-full'
								to={`/${module.id}`}
							>
								<p className=' w-1/4 '>{module.name}</p>
								<p className=' w-1/4 '>{`${module.available}`}</p>
								<p className=' w-1/4 '>{module.targetTemperature}°C</p>
								{messageFromSocket.map((msg, index) => {
									if (msg.id === module.id) {
										return (
											<p
												key={index}
												className={`w-1/4  ${
													msg.temperature <=
														module.targetTemperature +
															0.5 &&
													msg.temperature >=
														module.targetTemperature -
															0.5
														? 'text-green-700'
														: 'text-red-700'
												}`}
											>
												{msg.temperature}°C
											</p>
										)
									}
								})}
								{module.available === false && (
									<p className='w-1/4'>-</p>
								)}
							</NavLink>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
export default App
