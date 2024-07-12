import { editParameters } from '../api/editParameters'

export const checkForm = (newName, newDescription, newTemperature, setError, setFormShown, details) => {
	const reTemp = /[0-9]{0,2}.[0-9]{0,1}$/

	if (newName.trim() !== '' && newDescription.trim() !== '' && newTemperature !== '') {
		if (!reTemp.test(newTemperature)) {
			setError('Temparature must be number greater than 0 and less than 40 with one decimal place')
		} else {
			if (Number(newTemperature) <= 0 || Number(newTemperature) > 40) {
				setError('Temparature must be number greater than 0 and less than 40 with one decimal place')
			} else {
				setError('')
				editParameters(details, newName, newDescription, newTemperature)
				setFormShown(prev => !prev)
			}
		}
	} else {
		setError('Fill in all fields')
	}
}
