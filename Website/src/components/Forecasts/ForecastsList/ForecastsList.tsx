import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import s from './ForecastsList.module.scss';

import { ForecastType } from '../../../types/forecasts'
import { AppStateType } from '../../../types/types'

import ForecastsListElement from './ForecastsListElement'
import useScrollDown from '../../../hooks/useScrollDown';
import AdvertBlock from '../../Adverts/AdvertBlock';

type ForecastsListPropsType = {
	forecasts: Array<ForecastType>
	limit?: number

	instanceName?: string
}
const ForecastsList: FC<ForecastsListPropsType> = ({ forecasts, limit = 0, instanceName = "forecasts", ...props }) => {
	const dispatch = useDispatch()
	const isFetching = useSelector<AppStateType, boolean>(state => state.forecasts.isFetching)


	useScrollDown(instanceName)

	return (
		<div className={s.forecastList}>
			{forecasts.map((forecast, counter) =>
				(counter < limit || limit === 0) ?
					<>
						<ForecastsListElement forecast={forecast} isFetching={isFetching} key={forecast.id ? forecast.id : counter} />
						{(counter + 1) % 5 === 0 && <AdvertBlock />}
					</> : null
			)}

		</div>
	)
}
export default ForecastsList;