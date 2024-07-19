import { Input } from '../Input/Input'
import styles from '../SingleInfo/SingleInfo.module.css'
import { Textarea } from '../Textarea/Textarea'

export const SingleInfo = ({ text, type, isFormShown, textarea, defaultValue, details, onChange }) => {
	return (
		<div className={styles.singleInfo}>
			<p>{text}:</p>
			{!isFormShown && <p className={styles.name}>{details}</p>}
			{isFormShown &&
				(textarea === false ? (
					<Input type={type} defaultValue={defaultValue} onChange={onChange} />
				) : (
					<Textarea defaultValue={defaultValue} onChange={onChange} />
				))}
		</div>
	)
}
