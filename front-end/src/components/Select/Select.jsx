import styles from '../Select/Select.module.css'

export const Select = ({ onChange, text, options }) => {
	return (
		<label className={styles.select}>
			{text}
			<select name='selectedTimeframe' onChange={onChange}>
				{options.map(option => {
					return (
						<option key={option} value={option}>
							{option}
						</option>
					)
				})}
			</select>
		</label>
	)
}
