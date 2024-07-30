import { useState } from 'react'
import { NavLink, useLoaderData, useParams } from 'react-router-dom'
import { useGetDataFromSocket } from '../hooks/useGetDataFromSocket'
import { getModuleHistory } from '../api/getModuleHistory'
import { Chart } from './Chart'
import { Select } from './Select'
import { Button } from './Button'
import { SingleInfo } from './SingleInfo'
import { Form } from './Form'
import { editParameters } from '../api/editParameters'
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
	let currentTemp
	{
		messageFromSocket.map(msg => {
			if (msg.id === id) {
				currentTemp = msg.temperature
			}
		})
	}
	return (
		<div className='flex flex-col justify-center items-center sm:p-8 sm:my-8 rounded-xl shadow-xl max-w-3xl'>
			<div className='mb-4'>
				<p className='p-4 text-s sm:text-lg font-bold text-green-700'>Module details</p>
				<div className=''>
					{Object.entries(moduleInfo).map((value, index) => {
						return (
							<SingleInfo
								key={index}
								text={value[0]}
								details={`${value[1]}`}
							/>
						)
					})}

					{/* {isFormShown && <Form />} */}
				</div>
				{/* <div className='w-1/2'>
						{Object.values(moduleInfo).map((value, index) => {
							return <p key={index}>{value}</p>
						})}
					</div> */}

				{details.available === true && (
					<div className='flex'>
						<p className='p-4 w-40 sm:w-80 text-s sm:text-lg'>
							currentTemperature:
						</p>
						<p
							className={`p-4 w-40 sm:w-80 text-s sm:text-lg font-bold ${
								currentTemp <= details.targetTemperature + 0.5 &&
								currentTemp >= details.targetTemperature - 0.5
									? 'text-green-700'
									: 'text-red-700'
							}`}
						>
							{currentTemp}°C
						</p>
					</div>
				)}
				{isFormShown && (
					<Form
						onFormSend={newDetails => {
							details.name = newDetails.name
							details.description = newDetails.description
							details.targetTemperature = newDetails.targetTemperature
							editParameters(details, newDetails)
							setFormShown(false)
						}}
					/>
				)}
				{details.available === false && (
					<p className='mb-2 w-full text-right text-red-700'>
						You cannot edit unavailable module...{' '}
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
						disabled={details.available === false ? true : false}
						onClick={() => setFormShown(prev => !prev)}
					>
						EDIT PARAMETERS
					</Button>
				)}
			</div>

			<div className='flex flex-col w-full items-center sm:flex-row sm:justify-between mt-2 sm:mt-8 '>
				<Select
					onChange={e => {
						setSelectedOption(e.target.value)
						getModuleHistory(id, e.target.value, selectedTime).then(res => {
							setHistory(res)
						})
					}}
					text='Set a time mode:'
					options={['hourly', 'daily']}
				/>
				<Select
					onChange={e => {
						setSelectedTime(e.target.value)
						getModuleHistory(id, selectedOption, e.target.value).then(res => {
							setHistory(res)
						})
					}}
					text='Set number of days:'
					options={['1', '2', '7', '10', '30']}
				/>
			</div>
			<Chart history={history} />
		</div>
	)
}
