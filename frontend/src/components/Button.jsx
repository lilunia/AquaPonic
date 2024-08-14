export const Button = ({ isImg, src, onClick, children, disabled }) => {
	const baseClass = 'flex justify-center items-center p-4 mx-4 sm:mx-8 rounded-2xl text-xs sm:text-lg'
	const enabledClass = 'bg-green-300 hover:bg-green-200'
	const disabledClass = 'bg-gray-400 hover:bg-gray-400'

	return (
		<button
			className={`${baseClass} ${disabled ? disabledClass : enabledClass}`}
			onClick={onClick}
			disabled={disabled}
		>
			{isImg && <img className='mr-2' src={src} alt='' />}
			{children}
		</button>
	)
}
