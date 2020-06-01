import React, { FC, useState, useEffect } from 'react';
import Chart, { Bar } from 'react-chartjs-2';
import { NONAME } from 'dns';


const MatchBetsChart = ({ propsValues = [{}], ...props }) => {

	let values = propsValues.map(elem => +elem.forecasts_count)
	let labels = propsValues.map(elem => elem.type)

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


