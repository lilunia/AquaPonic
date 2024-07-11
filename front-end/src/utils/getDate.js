export const getDate = (days) => {
    
	const currentDate = new Date().toJSON()
    const dayBefore = new Date(Date.now() - days*86400000).toJSON()
	const date = dayBefore.substring(0, 10)
	const date2 = currentDate.substring(0, 10)

	const start = `${date}T00:00:00.000Z`
	const stop = `${date2}T00:00:00.000Z`

    return {start, stop}
}


