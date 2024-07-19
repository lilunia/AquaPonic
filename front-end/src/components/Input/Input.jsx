import styles from '../Input/Input.module.css'

export const Input = ({ type, defaultValue, onChange }) => {
	return (
		<input
			className={styles.name}
			type={type}
			defaultValue={defaultValue}
			onChange={onChange}
			step={0.5}
			lang='pl,en'
			data-testid='input-test'
		/>
	)
}
