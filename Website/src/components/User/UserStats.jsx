import React, { FC, useState, useEffect } from 'react';
import s from './User.module.scss';
import '../../App.scss'
import { Doughnut } from 'react-chartjs-2';
import useMobile from '../../hooks/useMobile';




const UserStats = ({ wins, loses, returns, ...props }) => {
	const isMobile = useMobile(768)

	const data = {
		labels: [
			'Ставка Выиграла',
			'Ставка Проиграла',
			'Возврат'
		],
		datasets: [{
			data: [wins, loses, returns],
			backgroundColor: ['#0F971D','#AA0F0F','#0F19AA'],
		}]
	};
	const options = {
		cutoutPercentage: isMobile ? 90 : 95,
		responsive: true,
		legend: {
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
            display: true,
			text: '188 Прогнозов',
			fontFamily: 'Roboto',
			fontSize: 20
		}

	}


	return (
		<Doughnut
			data={data}
			options={options}
		/>
	)
}
export default UserStats;