import {getDate } from '../utils/getDate'

export const getModuleHistory = async (id, selectedOption, days) => {
	const start = getDate(days).start
	const stop = getDate(days).stop
	const mode = selectedOption

	return fetch(`http://localhost:3001/modules/${id}/history?start=${start}&stop=${stop}&mode=${mode}`)
		.then(res => res.json())
		.then(data => {
			return data
		})
}
