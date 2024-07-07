export const getModuleDetails = ({ params: { id } }) => {
	return fetch(`http://localhost:3001/modules/${id}`)
}
