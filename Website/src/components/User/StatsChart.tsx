import React, { FC, useState, useEffect } from 'react';
import s from './User.module.scss';
import classNames from 'classnames'
import Chart, { Doughnut } from 'react-chartjs-2';
import useMobile from '../../hooks/useMobile';


type StatsChartPropsType = {
	wins: number
	loses: number
	returns: number
}

const StatsChart: FC<StatsChartPropsType> = ({ wins, loses, returns, ...props }) => {
	const isMobile = useMobile(768)
	const data = {
		labels: [
			'Ставка Выиграла',
			'Ставка Проиграла',
			'Возврат'
		],
		datasets: [{
			data: [wins, loses, returns],
			backgroundColor: ['#0F971D', '#AA0F0F', '#0F19AA'],
		}]
	};

	const options = {
		cutoutPercentage: isMobile ? 90 : 92,
		responsive: true,
		legend: {
			display: false,
			position: 'right',
			boxWidth: 40,
			labels: {
				fontSize: 15,
				fontColor: '#343638',
				lineHeight: 18,
				padding: 16
			}
		},
		title: {
			display: false,
			text: `${wins+loses+returns} Прогнозов`,
			fontFamily: 'Roboto',
			fontSize: 30
		},
		centerText: {
			display: true,
			text: `${wins + loses + returns}`,
			fontFamily: 'Roboto',
		}
	}



	function drawTotals(chart: any) {
		let width = chart.chart.width,
		height = chart.chart.height,
		ctx = chart.chart.ctx;

		ctx.restore();
		let fontSize = (height / 74).toFixed(2);
		ctx.font = fontSize + "em sans-serif";
		ctx.textBaseline = "middle";

		let text = chart.options.centerText.text,
			textX = Math.round((width - ctx.measureText(text).width) / 2)
	
		let textY = (height / 2).toFixed(2)

		ctx.fillText(text, textX, textY);
		ctx.save();
	}


	return (
		<Doughnut
			width={200}
			data={data}
			options={options}
			plugins={[{
				beforeDraw: function(chart: any) {
					if (chart.options.centerText.display !== null &&
						typeof chart.options.centerText.display !== 'undefined' &&
						chart.options.centerText.display) {
						drawTotals(chart);
					}
				},
			}]}
		/>
	)
}


export default StatsChart;


