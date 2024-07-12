import { NavLink, useLoaderData, useParams } from 'react-router-dom'
import styles from '../ModuleDetails/ModuleDetails.module.css'
import ARROW_LEFT from '../../assets/arrow-left.svg'
import EDIT from '../../assets/edit.svg'
import { useEffect, useState } from 'react'
import { useGetDataFromSocket } from '../../hooks/useGetDataFromSocket'
import { Chart } from '../Chart/Chart'
import { getModuleHistory } from '../../api/getModuleHistory'
import { checkForm } from '../../utils/checkForm'
import { Select } from '../Select/Select'

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
	useEffect(() => {}, [history, selectedOption])

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

				<div className={styles.singleInfo}>
					<p>name:</p>
					{!isFormShown && <p className={styles.name}>{details.name}</p>}
					{isFormShown && (
						<input
							className={styles.name}
							type='name'
							defaultValue={newName}
							onChange={e => setNewName((details.name = e.target.value))}
						/>
					)}
				</div>
				<div className={styles.singleInfo}>
					<p>description:</p>
					{!isFormShown && <p className={styles.name}>{details.description}</p>}
					{isFormShown && (
						<textarea
							className={styles.name}
							type='name'
							defaultValue={newDescription}
							onChange={e =>
								setNewDescription(
									(details.description = e.target.value)
								)
							}
						/>
					)}
				</div>
				<div className={styles.singleInfo}>
					<p>available:</p>
					<p className={styles.name}>{`${details.available}`}</p>
				</div>
				<div className={styles.singleInfo}>
					<p>target temperature:</p>
					{!isFormShown && <p className={styles.name}>{details.targetTemperature}°C</p>}
					{isFormShown && (
						<input
							className={styles.name}
							type='number'
							step={0.5}
							lang='pl,en'
							defaultValue={newTemperature}
							onChange={e =>
								setNewTemperature(
									(details.targetTemperature = Number(
										e.target.value
									))
								)
							}
						/>
					)}
				</div>

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
			<div className={styles.buttons}>
				<NavLink to='/'>
					<button>
						<img className={styles.arrowImg} src={ARROW_LEFT} alt='' />
						GO BACK
					</button>
				</NavLink>
				{isFormShown && (
					<button
						method='PATCH'
						onClick={() => {
							checkForm(
								newName,
								newDescription,
								newTemperature,
								setError,
								setFormShown,
								details
							)
						}}
					>
						SAVE
					</button>
				)}
				{!isFormShown && (
					<button
						onClick={() => setFormShown(prev => !prev)}
						disabled={details.available === false ? true : false}
					>
						EDIT PARAMETERS
						<img className={styles.editImg} src={EDIT} alt='' />
					</button>
				)}
			</div>
			{details.available === true && (
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
							getModuleHistory(id, selectedOption, e.target.value).then(
								res => {
									setHistory(res)
								}
							)
						}}
						text='Set number of days:'
						options={['1', '2', '7', '10', '30']}
					/>
				</div>
			)}

			{details.available === true && <Chart history={history} />}
		</div>
	)
}
