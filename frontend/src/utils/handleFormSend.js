import { editParameters } from '../api/editParameters'

export const handleFormSend = (details, setFormShown) => newDetails => {
	details.name = newDetails.name
	details.description = newDetails.description
	details.targetTemperature = newDetails.targetTemperature
	editParameters(details, newDetails)
	setFormShown(false)
}
