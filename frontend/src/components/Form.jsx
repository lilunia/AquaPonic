import { useForm } from 'react-hook-form'
import { Button } from './Button'

export const Form = ({ onFormSend }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const onSubmit = data => {
		onFormSend(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate className='flex flex-col items-end'>
			<p className='w-1/2 mb-2 font-bold text-green-700'>Enter new values for module:</p>
			<input
				className='flex mb-2 w-1/2 border '
				id='name'
				placeholder='Enter a new name'
				{...register('name', {
					required: 'Enter a new name',
				})}
			/>
			{errors.name && <span className='mb-2 w-1/2 text-red-700 '>{errors.name.message}</span>}
			<textarea
				className='mb-2 w-1/2  min-h-20 max-h-60 border'
				id='description'
				placeholder='Enter a new description'
				{...register('description', {
					required: 'Enter a new description',
				})}
			/>
			{errors.description && (
				<span className='mb-2 w-1/2 text-red-700 '>{errors.description.message}</span>
			)}
			<input
				className='mb-2 w-1/2 border'
				id='targetTemperature'
				type='number'
				placeholder='Enter a new temperature'
				{...register('targetTemperature', {
					valueAsNumber: true,
					required: { value: true, message: 'Enter a new temperature' },
					min: { value: 0.1, message: 'Temparature must be a number above 0' },
					max: { value: 39.9, message: 'Temparature must be a number below 40' },
				})}
			/>
			{errors.targetTemperature && (
				<span className='w-1/2 text-red-700 mb-2'>{errors.targetTemperature.message}</span>
			)}
			<Button>SAVE</Button>
		</form>
	)
}
