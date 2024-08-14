import { SingleInfo } from './SingleInfo'

export const ModuleInfo = ({ moduleInfo }) => (
	<div>
		{Object.entries(moduleInfo).map(([key, value], index) => (
			<SingleInfo
				key={index}
				text={key}
				details={typeof value === 'number' ? `${value}°C` : `${value}`}
			/>
		))}
	</div>
)
