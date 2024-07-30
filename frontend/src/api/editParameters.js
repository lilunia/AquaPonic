export const editParameters = (details,newDetails) => {
	fetch(`http://localhost:3001/modules/${details.id}`, {
		method: 'PATCH',
		body: JSON.stringify(details),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then(res => {
		if (res.ok) {
			console.log(newDetails)
			console.log(details);
			details.name = newDetails.name
			details.description = newDetails.description
			details.targetTemperature = newDetails.targetTemperature
			console.log(details);
		}
	})
}
