import { useForm } from 'react-hook-form'
import { Button } from './Button'
import { InputField } from './InputField'
import { TextareaField } from './TextareaField'

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
			<p className='mb-2 px-4 w-full font-bold text-green-700'>Enter new values for module:</p>

			<InputField
				id='name'
				placeholder='Enter a new name'
				register={register}
				validation={{ required: 'Enter a new name' }}
				errors={errors}
			/>

			<TextareaField
				id='description'
				placeholder='Enter a new description'
				register={register}
				validation={{ required: 'Enter a new description' }}
				errors={errors}
			/>

			<InputField
				id='targetTemperature'
				placeholder='Enter a new temperature'
				register={register}
				validation={{
					valueAsNumber: true,
					required: { value: true, message: 'Enter a new temperature' },
					min: { value: 0.1, message: 'Temperature must be above 0' },
					max: { value: 40, message: 'Temperature must be 40 or less' },
				}}
				errors={errors}
			/>

			<Button>SAVE</Button>
		</form>
	)
}
