import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import { ForecastType } from '../../types/forecasts'

import Forecast from './Forecast'

import { withRouter, RouteComponentProps  } from 'react-router'

import { getForecastFromServer } from '../../redux/forecasts-reducer'

interface MatchParams {
    forecastId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const ForecastsContainer: FC<Props> = ({ ...props }) => {
	const forecast = useSelector<AppStateType, ForecastType>(state => state.forecasts.currentForecast)
	const isFetching = useSelector<AppStateType, boolean>(state => state.forecasts.isFetching)

	const dispatch = useDispatch()
	let forecastId = props.match.params.forecastId ? props.match.params.forecastId : 1;

	useEffect(() => {
		dispatch(getForecastFromServer(+forecastId))		
	}, []);
 
	if (!forecast.id) {
		return <div></div>
	} else 

	return (
		<Forecast
			forecast={forecast}
		/>
	)
}

export default withRouter(ForecastsContainer);