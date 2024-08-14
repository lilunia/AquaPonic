export const SingleInfo = ({ text, details }) => {
	const commonClass = 'p-4 w-40 sm:w-80  text-s sm:text-lg'
	return (
		<div className='flex content-start'>
			<p className={commonClass}>{text}:</p>
			<p className={`${commonClass} font-bold break-words`}>{details}</p>
		</div>
	)
}
