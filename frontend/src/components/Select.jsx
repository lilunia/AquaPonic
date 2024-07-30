export const Select = ({ onChange, text, options }) => {
	return (
		<label className='m-4 text-s sm:text-lg'>
			{text}
			<select
				className='mx-4 text-s sm:text-lg bg-transparent cursor-pointer border-b-2 border-green-700'
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
