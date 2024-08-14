export const Select = ({ onChange, text, options }) => {
	const commonClass = 'm-4 text-s sm:text-lg'
	return (
		<label className={commonClass}>
			{text}
			<select
				className={`${commonClass} bg-transparent cursor-pointer border-b-2 border-green-700`}
				name='selectedTimeframe'
				onChange={onChange}
			>
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
