import React, { FC } from 'react';
import s from './ForecastsList.module.scss';
import { ForecastType } from '../../../types/forecasts'

import ForecastsListElement from './ForecastsListElement'

type ForecastsListPropsType = {
	forecasts: Array<ForecastType>
	limit?: number
}
const ForecastsList: FC<ForecastsListPropsType> = ({ forecasts, limit = 0,...props }) => {
	return (
		<div className={s.forecastList}>
			{forecasts.map((forecast, counter) => 
				(counter < limit || limit === 0) ? <ForecastsListElement forecast={forecast}/> : null
			)}
			
		</div>
	)
}
export default ForecastsList;