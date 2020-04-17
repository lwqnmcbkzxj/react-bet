import React, { FC } from 'react';
import s from './ForecastsList.module.css';
import { ForecastType } from '../../../types/types'

import { ForecastFiltersType } from '../../../types/types'

type ForecastsPropsType = {
	forecast: ForecastType
}
const Forecasts: FC<ForecastsPropsType> = ({ forecast, ...props }) => {
	return (
		<div className={s.forecastsPage}>
			
		</div>
	)
}
export default Forecasts;