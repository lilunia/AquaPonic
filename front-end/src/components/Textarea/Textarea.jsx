import styles from '../Textarea/Textarea.module.css'
export const Textarea = ({ defaultValue, onChange }) => {
	return <textarea className={styles.name} type='name' defaultValue={defaultValue} onChange={onChange} />
}
