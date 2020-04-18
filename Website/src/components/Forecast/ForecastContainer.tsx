import React, { FC } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType, ForecastType } from '../../types/types'
import Forecast from './Forecast'

import { withRouter, RouteComponentProps  } from 'react-router'

interface MatchParams {
    forecastId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const ForecastsContainer: FC<Props> = ({ ...props }) => {
	const forecast = useSelector<AppStateType, ForecastType>(state => state.forecast)


	const dispatch = useDispatch()
	let forecastId = props.match.params.forecastId ? props.match.params.forecastId : 1;
	console.log(forecastId)
	return (
		<Forecast
			
		/>
	)
}

export default withRouter(ForecastsContainer);