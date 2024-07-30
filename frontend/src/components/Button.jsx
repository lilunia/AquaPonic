export const Button = ({ isImg, src, onClick, children, disabled }) => {
	return (
		<button
			className={`flex justify-center items-center p-4 mx-4 sm:mx-8 bg-green-300 hover:bg-green-200 rounded-2xl text-xs sm:text-lg ${
				disabled ? 'bg-gray-400 hover:bg-gray-400' : ''
			}`}
			onClick={onClick}
			disabled={disabled}
		>
			{isImg && <img className='mr-2' src={src} alt='' />}
			{children}
		</button>
	)
}
