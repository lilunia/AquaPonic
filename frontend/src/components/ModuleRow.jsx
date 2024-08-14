import { NavLink } from 'react-router-dom'

export const ModuleRow = ({ module, messageFromSocket }) => {
	const message = messageFromSocket.find(msg => msg.id === module.id)
	const isTemperatureInRange = message
		? message.temperature <= module.targetTemperature + 0.5 &&
		  message.temperature >= module.targetTemperature - 0.5
		: false

	return (
		<li
			key={module.id}
			className='flex justify-between text-center border-b-2 border-green-200 last-of-type:border-b-0 hover:bg-green-100'
		>
			<NavLink className='flex items-center justify-center py-4 sm:py-8 w-full' to={`/${module.id}`}>
				<p className='w-1/4'>{module.name}</p>
				<p className='w-1/4'>{`${module.available}`}</p>
				<p className='w-1/4'>{module.targetTemperature}°C</p>
				<p className={`w-1/4 ${isTemperatureInRange ? 'text-green-700' : 'text-red-700'}`}>
					{message ? `${message.temperature}°C` : '-'}
				</p>
			</NavLink>
		</li>
	)
}
