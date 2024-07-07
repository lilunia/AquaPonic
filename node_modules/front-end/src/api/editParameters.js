export const editParameters = (details, newName, newDescription, newTemperature) => {
	fetch(`http://localhost:3001/modules/${details.id}`, {
		method: 'PATCH',
		body: JSON.stringify(details),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then(res => {
		if (res.ok) {
			details.name = newName
			details.description = newDescription
			details.targetTemperature = Number(newTemperature)
		}
	})
}
