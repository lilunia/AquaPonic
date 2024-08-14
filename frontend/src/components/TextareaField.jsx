export const TextareaField = ({ id, placeholder, register, validation, errors }) => (
	<div className='mb-2 px-4 w-full'>
		<textarea
			className='min-h-20 max-h-60 w-full border'
			id={id}
			placeholder={placeholder}
			{...register(id, validation)}
		/>
		{errors[id] && <span className='text-red-700'>{errors[id].message}</span>}
	</div>
)
