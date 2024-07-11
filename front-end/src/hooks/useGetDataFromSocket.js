import { useState } from 'react'
import { useEffect } from 'react'

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
		const interval = setInterval(() => {
			socket.connect()
			socket.on('moduleUpdate', onConnect)
		}, 1000)

		return () => {
			socket.off('moduleUpdate', onConnect)
			clearInterval(interval)
		}
	}, [socket])

	return { messageFromSocket }
}
