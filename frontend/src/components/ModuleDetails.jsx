import { useState, useEffect } from 'react'
import { NavLink, useLoaderData } from 'react-router-dom'
import { useGetDataFromSocket } from '../hooks/useGetDataFromSocket'
import { getModuleHistory } from '../api/getModuleHistory'
import { Chart } from './Chart'
import { Select } from './Select'
import { Button } from './Button'
import { ModuleInfo } from './ModuleInfo'
import { CurrentTemperature } from './CurrentTemperature'
import { Form } from './Form'
import { handleSelectChange } from '../utils/handleSelectChange'
import { handleFormSend } from '../utils/handleFormSend'
import ARROW_LEFT from '../assets/arrow-left.svg'
import EDIT from '../assets/edit.svg'

export const ModuleDetails = () => {
	const moduleData = useLoaderData()
	const details = moduleData[0]
	const [history, setHistory] = useState(moduleData[1])
	const [isFormShown, setFormShown] = useState(false)
	const [selectedOption, setSelectedOption] = useState('daily')
	const [selectedTime, setSelectedTime] = useState('1')
	const { id, ...moduleInfo } = details
	const { messageFromSocket } = useGetDataFromSocket()
	const currentTemp = messageFromSocket.find(msg => msg.id === id)?.temperature

	useEffect(() => {
		getModuleHistory(id, selectedOption, selectedTime).then(setHistory)
	}, [id, selectedOption, selectedTime])

	return (
		<div className='flex flex-col justify-center items-center sm:p-8 sm:my-8 rounded-xl shadow-xl max-w-3xl'>
			<div className='mb-4'>
				<p className='p-4 text-s sm:text-lg font-bold text-green-700'>Module details</p>
				<ModuleInfo moduleInfo={moduleInfo} />
				{details.available && (
					<CurrentTemperature
						currentTemp={currentTemp}
						targetTemperature={details.targetTemperature}
					/>
				)}
				{isFormShown && <Form onFormSend={handleFormSend(details, setFormShown)} />}
				{!details.available && (
					<p className='mb-2 w-full text-right text-red-700'>
						You cannot edit unavailable module...
					</p>
				)}
			</div>
			<div className='flex justify-center sm:justify-between w-full'>
				<NavLink to='/'>
					<Button isImg={true} src={ARROW_LEFT}>
						GO BACK
					</Button>
				</NavLink>
				{!isFormShown && (
					<Button
						isImg={true}
						src={EDIT}
						disabled={!details.available}
						onClick={() => setFormShown(!isFormShown)}
					>
						EDIT PARAMETERS
					</Button>
				)}
			</div>
			{details.available && (
				<div>
					<div className='flex flex-col w-full items-center sm:flex-row sm:justify-between mt-2 sm:mt-8'>
						<Select
							onChange={handleSelectChange(
								setSelectedOption,
								id,
								selectedOption,
								selectedTime,
								setHistory
							)}
							text='Set a time mode:'
							options={['hourly', 'daily']}
						/>
						<Select
							onChange={handleSelectChange(
								setSelectedTime,
								id,
								selectedOption,
								selectedTime,
								setHistory
							)}
							text='Set number of days:'
							options={['1', '2', '7', '10', '30']}
						/>
					</div>
					<Chart history={history} />
				</div>
			)}
		</div>
	)
}
