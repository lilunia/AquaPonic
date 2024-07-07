import styles from './App.module.css'
import { NavLink, useLoaderData } from 'react-router-dom'

const App = () => {
	const modules = useLoaderData()

	return (
		<div className={styles.modules}>
			<div className={styles.headers}>
				<p>Name</p>
				<p>Available</p>
				<p>Target Temperature</p>
			</div>
			<ul>
				{modules.map(module => {
					return (
						<li key={module.id} className={styles.module}>
							<NavLink to={`/${module.id}`}>
								<p>{module.name}</p>
								<p>{`${module.available}`}</p>
								<p>{module.targetTemperature}°C</p>
							</NavLink>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default App
