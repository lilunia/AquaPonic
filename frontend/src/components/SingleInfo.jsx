
export const SingleInfo = ({ text, details }) => {
	return (
		<div className='flex content-start'>
			<p className='p-4 w-40 sm:w-80  text-s sm:text-lg'>{text}:</p>
			<p className='p-4 w-40 sm:w-80  font-bold break-words text-s sm:text-lg'>{details}</p>
		</div>
	)
}
