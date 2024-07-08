import { NavLink, useLoaderData } from 'react-router-dom'
import styles from '../ModuleDetails/ModuleDetails.module.css'
import ARROW_LEFT from '../../assets/arrow-left.svg'
import EDIT from '../../assets/edit.svg'
import { useState } from 'react'
import { editParameters } from '../../api/editParameters'

export const ModuleDetails = () => {
	const details = useLoaderData()
	const [isFormShown, setFormShown] = useState(false)
	const [newName, setNewName] = useState(details.name)
	const [newDescription, setNewDescription] = useState(details.description)
	const [newTemperature, setNewTemperature] = useState(details.targetTemperature)
	const [error, setError] = useState('')

	// const { Form } = useFetcher()

	const checkForm = () => {
		// const reTemp = /([0-9]{1,2}).[0-9]{0,1}$/
		const reTemp = /^[0-9]{1,2}.[0-9]{0,1}$/

		if (newName.trim() !== '' && newDescription.trim() !== '' && newTemperature !== '') {
			if (!reTemp.test(newTemperature)) {
				setError('Temparature must be a number between 0 and 40 with one decimal place')
			} else {
				if (Number(newTemperature) < 0 || Number(newTemperature) > 40) {
					setError('Temparature must be a number between 0 and 40')
				} else {
					setError('')
					editParameters(details, newName, newDescription, newTemperature)
					setFormShown(prev => !prev)
				}
			}
		} else {
			setError('Fill in all fields')
		}
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
				<div className={styles.singleInfo}>
					<p>current temperature:</p>
					<p></p>
				</div>
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
							checkForm()
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
		</div>
	)
}
