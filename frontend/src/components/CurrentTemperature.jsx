export const CurrentTemperature = ({ currentTemp, targetTemperature }) => (
	<div className='flex'>
		<p className='p-4 w-40 sm:w-80 text-s sm:text-lg'>currentTemperature:</p>
		<p
			className={`p-4 w-40 sm:w-80 text-s sm:text-lg font-bold ${
				currentTemp <= targetTemperature + 0.5 && currentTemp >= targetTemperature - 0.5
					? 'text-green-700'
					: 'text-red-700'
			}`}
		>
			{currentTemp}°C
		</p>
	</div>
)