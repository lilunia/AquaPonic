import styles from '../Button/Button.module.css'

export const Button = ({ isImg, src, onClick, children, disabled }) => {
	return (
		<button onClick={onClick} disabled={disabled}>
			{isImg && <img className={styles.iconImg} src={src} alt='' />}
			{children}
		</button>
	)
}
