export const InputField = ({ id, placeholder, register, validation, errors }) => (
	<div className="mb-2 px-4 w-full">
		<input
			className='flex w-full border'
			id={id}
			placeholder={placeholder}
			{...register(id, validation)}
		/>
		{errors[id] && <span className='text-red-700'>{errors[id].message}</span>}
	</div>
);