import { getDate } from '../utils/getDate'

export const getModuleDetails = async ({ params: { id } }) => {
	const start = getDate(1).start
	const stop = getDate(1).stop
	const mode = 'hourly'

	const detailsUrl = fetch(`http://localhost:3001/modules/${id}`)
	const historyUrl = fetch(`http://localhost:3001/modules/${id}/history?start=${start}&stop=${stop}&mode=${mode}`)
	return Promise.all([detailsUrl, historyUrl])
		.then(ress => Promise.all(ress.map(res => res.json())))
		.then(moduleData => {
			return moduleData
		})
}
