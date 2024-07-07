export const getModules = () => {
	return fetch('http://localhost:3001/modules')
	// .then(res => res.json())
	// .then(data => {
    //     console.log(data);
    //     return data
	// })
   
}