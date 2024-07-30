import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

export const useGetDataFromSocket = () => {
	const [messageFromSocket, setMessageFromSocket] = useState([])

	const socket = io('http://localhost:3001', {
		autoConnect: false,
		transports: ['websocket'],
	})

	useEffect(() => {
		const onConnect = message => {
			setMessageFromSocket(message)
		}
		socket.connect()
		socket.on('moduleUpdate', onConnect)

		return () => {
			socket.off('moduleUpdate', onConnect)
		}
	}, [])

	return { messageFromSocket }
}
