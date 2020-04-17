import React, { FC } from 'react';
import s from './ForecastsList.module.css';
import { ForecastType, ForecastFiltersType } from '../../../types/types'

import ForecastsListElement from './ForecastsListElement'

type ForecastsListPropsType = {
	forecasts: Array<ForecastType>
	filters: ForecastFiltersType
}
const ForecastsList: FC<ForecastsListPropsType> = ({ forecasts, filters, ...props }) => {
	return (
		<div className={s.forecastList}>
			{forecasts.map(forecast => 
				<ForecastsListElement forecast={forecast}/>
			)}
			
		</div>
	)
}
export default ForecastsList;