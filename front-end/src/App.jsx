import { io } from 'socket.io-client'
import styles from './App.module.css'
import { NavLink, useLoaderData } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'

const App = () => {
	const modules = useLoaderData()
	const [messageFromSocket, setMessageFromSocket] = useState([])

	const socket = io('localhost:3001', {
		transports: ['websocket'],
	})
	socket.connect()
	useEffect(() => {
		socket.on('moduleUpdate', message => {
			setMessageFromSocket(message)
		})
	}, [socket, modules])

	return (
		<div className={styles.modules}>
			<div className={styles.headers}>
				<p>Name</p>
				<p>Available</p>
				<p>Target Temperature</p>
				<p>Temperature</p>
			</div>
			<ul>
				{modules.map(module => {
					return (
						<li key={module.id} className={styles.module}>
							<NavLink to={`/${module.id}`}>
								<p>{module.name}</p>
								<p>{`${module.available}`}</p>
								<p>{module.targetTemperature}°C</p>
								{messageFromSocket.map((msg, index) => {
									if (msg.id === module.id) {
										return (
											<p
												key={index}
												className={
													msg.temperature <=
														module.targetTemperature +
															0.5 &&
													msg.temperature >=
														module.targetTemperature -
															0.5
														? styles.withinScope
														: styles.beyondScope
												}
											>
												{msg.temperature}°C
											</p>
										)
									}
								})}
								{module.available === false && <p>-</p>}
							</NavLink>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default App
