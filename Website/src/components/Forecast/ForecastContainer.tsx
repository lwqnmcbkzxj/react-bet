import React, { FC, useState, useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import { ForecastType } from '../../types/forecasts'

import Forecast from './Forecast'

import { withRouter, RouteComponentProps  } from 'react-router'

import { getForecastFromServer, getForecastComments } from '../../redux/forecasts-reducer'
import { CommentsEnum } from '../../types/types'

interface MatchParams {
    forecastId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const ForecastsContainer: FC<Props> = ({ ...props }) => {
	const forecast = useSelector<AppStateType, ForecastType>(state => state.forecasts.currentForecast)
	const isFetching = useSelector<AppStateType, boolean>(state => state.forecasts.isFetching)

	const dispatch = useDispatch()
	let forecastId = props.match.params.forecastId ? props.match.params.forecastId : 1;

	const [commentFilter, setCommentFilter] = useState(CommentsEnum.rating)
	const getComments = () => {
		dispatch(getForecastComments(+forecastId, commentFilter))
	}

	useEffect(() => {
		(async function asyncFunction() {
			await dispatch(getForecastFromServer(+forecastId))	
			getComments()
		})()
	}, []);

	useEffect(() => {
		getComments()
	}, [commentFilter]);
 
	if (!forecast.id || isFetching) {
		return <div></div>
	} else 

	return (
		<Forecast
			forecast={forecast}
			commentsFunctions={{
				refreshComments: () => { getComments() },
				commentFilter,
				setCommentFilter
			}}
		/>
	)
}

export default withRouter(ForecastsContainer);