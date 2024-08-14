import { getModuleHistory } from '../api/getModuleHistory'

export const handleSelectChange = (setter, id, selectedOption, selectedTime, setHistory) => e => {
	setter(e.target.value)
	getModuleHistory(id, selectedOption, selectedTime).then(setHistory)
}
