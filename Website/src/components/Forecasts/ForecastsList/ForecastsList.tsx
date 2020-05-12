import React, { FC } from 'react';
import { useDispatch, useSelector} from "react-redux"

import s from './ForecastsList.module.scss';

import { ForecastType } from '../../../types/forecasts'
import { AppStateType } from '../../../types/types'

import ForecastsListElement from './ForecastsListElement'

type ForecastsListPropsType = {
	forecasts: Array<ForecastType>
	limit?: number
}
const ForecastsList: FC<ForecastsListPropsType> = ({ forecasts, limit = 0, ...props }) => {
	const isFetching = useSelector<AppStateType, boolean>(state => state.forecasts.isFetching)
	
	return (
		<div className={s.forecastList}>
			{forecasts.map((forecast, counter) => 
				(counter < limit || limit === 0) ? <ForecastsListElement forecast={forecast} isFetching={isFetching} key={forecast.id}/> : null
			)}
			
		</div>
	)
}
export default ForecastsList;