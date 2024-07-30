import {
	Chart as ChartJS,
	LineElement,
	PointElement,
	CategoryScale,
	LinearScale,
	Title,
	Legend,
	Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useEffect, useState } from 'react'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Legend, Tooltip)

export const Chart = ({ history }) => {
	const [chartData, setChartData] = useState({
		datasets: [],
	})
	const [chartOptions, setChartOptions] = useState({})

	useEffect(() => {
		let historyData = history.map(day => {
			const formatedDate = new Date(day.timestamp).toLocaleString('pl-PL', {
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
			})
			return formatedDate
		})
		let historyTemp = history.map(temp => {
			const temperature = temp.temperature
			return temperature
		})
		setChartData({
			labels: historyData,
			datasets: [
				{
					label: 'temperature [°C]',
					data: historyTemp,
					borderColor: 'rgb(28, 133, 28)',
					backgroundColor: 'rgba(28, 133, 28, 0.4)',
				},
			],
		})

		setChartOptions({
			responsive: true,
			plugins: {
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'Historical temperatures',
				},
			},
		})
	}, [history])

	return (
		<div className='flex p-4 h-48 w-full sm:h-80 '>
			<Line options={chartOptions} data={chartData} />
		</div>
	)
}
