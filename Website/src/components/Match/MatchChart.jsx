import React, { FC, useState, useEffect } from 'react';
import Chart, { Bar } from 'react-chartjs-2';
import { NONAME } from 'dns';


const MatchBetsChart = ({ ...props }) => {
	let propsValues = [
		{ label: 'П1', value: 80 },
		{ label: 'Х', value: 50 },
		{ label: 'П2', value: 40 },
		{ label: 'ТБ', value: 60 },
		{ label: 'ТМ', value: 70 },
		{ label: 'Другое', value: 10 },
	]
	let values = propsValues.map(elem => elem.value)
	let labels = propsValues.map(elem => elem.label)

	let stepSize = values.reduce((elem, sum) => sum += elem) / values.length
	stepSize = (stepSize / 10 / 3).toFixed(0) * 10

	const data = {
		labels: [...labels],
		datasets: [{
			data: [...values],
			backgroundColor: '#D5D8DD',
		}],
		borderWidth: 5,
	};

	const options = {
		legend: {
			display: false
		},
		scales: {
			xAxes: [{
				gridLines: {
					drawOnChartArea: false,
					drawTicks: false
				},
				ticks: {
					padding: 10,

				}
				
			}],
			yAxes: [{
				gridLines: {
					// color: "rgb(213, 216, 221)",
					drawBorder: false,
				},
				ticks: {
					stepSize: stepSize,
					padding: 10,
					min: 0
				}
			}],
		},
	}





	return (
		<Bar
			data={data}
			options={options}
		/>
	)
}


export default MatchBetsChart;


