import { useLoaderData, useParams } from 'react-router-dom'
import styles from '../ModuleDetails/ModuleDetails.module.css'
import { useState } from 'react'
import { useGetDataFromSocket } from '../../hooks/useGetDataFromSocket'
import { getModuleHistory } from '../../api/getModuleHistory'
import { Chart } from '../Chart/Chart'
import { Select } from '../Select/Select'

import { SingleInfo } from '../SingleInfo/SingleInfo'
import { checkForm } from '../../utils/checkForm'
import { Buttons } from '../Buttons/Buttons'

export const ModuleDetails = () => {
	const moduleData = useLoaderData()
	const details = moduleData[0]
	const [history, setHistory] = useState(moduleData[1])
	const { id } = useParams()
	const [isFormShown, setFormShown] = useState(false)
	const [newName, setNewName] = useState(details.name)
	const [newDescription, setNewDescription] = useState(details.description)
	const [newTemperature, setNewTemperature] = useState(details.targetTemperature)
	const [error, setError] = useState('')
	const [selectedOption, setSelectedOption] = useState('daily')
	const [selectedTime, setSelectedTime] = useState('1')

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
		<div className={styles.details}>
			<div className={styles.detailsInfo}>
				<p className={styles.header}>Module details</p>
				<SingleInfo
					text='name'
					type='text'
					isFormShown={isFormShown}
					textarea={false}
					defaultValue={newName}
					details={details.name}
					onChange={e => setNewName((details.name = e.target.value))}
				/>
				<SingleInfo
					text='description'
					type='textarea'
					isFormShown={isFormShown}
					textarea={true}
					defaultValue={newDescription}
					details={details.description}
					onChange={e => setNewDescription((details.description = e.target.value))}
				/>
				<div className={styles.singleInfo}>
					<p>available:</p>
					<p className={styles.name}>{`${details.available}`}</p>
				</div>
				<SingleInfo
					text='target temperature'
					type='number'
					isFormShown={isFormShown}
					textarea={false}
					defaultValue={newTemperature}
					details={`${details.targetTemperature}°C`}
					onChange={e =>
						setNewTemperature((details.targetTemperature = Number(e.target.value)))
					}
				/>

				{details.available === true && (
					<div className={styles.singleInfo}>
						<p>current temperature:</p>
						<p
							className={
								currentTemp <= details.targetTemperature + 0.5 &&
								currentTemp >= details.targetTemperature - 0.5
									? `${styles.name} ${styles.withinScope}`
									: `${styles.name} ${styles.beyondScope}`
							}
						>
							{currentTemp}°C
						</p>
					</div>
				)}

				{error && <p className={styles.error}>{error}</p>}
				{details.available === false && (
					<p className={styles.error}>You cannot edit unavailable module... </p>
				)}
			</div>
			<Buttons
				isFormShown={isFormShown}
				onClickSave={() => {
					checkForm(
						newName,
						newDescription,
						newTemperature,
						setError,
						setFormShown,
						details
					)
				}}
				onClickEdit={() => setFormShown(prev => !prev)}
				disabled={details.available === false ? true : false}
			/>
			<div className={styles.dateSettings}>
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
