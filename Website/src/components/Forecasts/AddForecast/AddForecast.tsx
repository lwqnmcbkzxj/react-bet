import React, { FC, useState } from 'react';
// import s from './Forecasts.module.scss';
import classNames from 'classnames'
// import '../../App.scss'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'


type ForecastsPropsType = {
	
}
const Forecasts: FC<ForecastsPropsType> = ({ ...props }) => {

	

	return (
		<div className='s'>
			Добавление прогноза
		</div>
	)
}
export default Forecasts;