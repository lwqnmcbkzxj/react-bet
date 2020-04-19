import React, { FC } from 'react';
import s from './ForecastsList.module.scss';
import { ForecastType, ForecastFiltersType } from '../../../types/types'

import ForecastsListElement from './ForecastsListElement'

type ForecastsListPropsType = {
	forecasts: Array<ForecastType>
	filters?: ForecastFiltersType
	limit?: number
}
const ForecastsList: FC<ForecastsListPropsType> = ({ forecasts, filters, limit = 0,...props }) => {
	return (
		<div className={s.forecastList}>
			{forecasts.map((forecast, counter) => 
				(counter < limit || limit === 0) ? <ForecastsListElement forecast={forecast}/> : null
			)}
			
		</div>
	)
}
export default ForecastsList;