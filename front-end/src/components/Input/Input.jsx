import styles from '../Input/Input.module.css'

export const Input = ({ text, isFormShown, newName, setNewName, details }) => {
	return (
		<div className={styles.singleInfo}>
			<p>{text}:</p>
			{!isFormShown && <p className={styles.name}>{details}</p>}
			{isFormShown && (
				<input
					className={styles.name}
					type='name'
					defaultValue={newName}
					onChange={e => setNewName((details = e.target.value))}
				/>
			)}
		</div>
	)
}
