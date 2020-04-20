import React, { FC } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import Forecasts from './Forecasts'

import { toggleFilter } from '../../redux/forecasts-reducer'
import { ForecastsFiltersType, ForecastType } from '../../types/forecasts'
import { withRouter, RouteComponentProps  } from 'react-router'

interface MatchParams {
    forecastId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const ForecastsContainer: FC<Props> = ({ ...props }) => {
	const forecasts = useSelector<AppStateType, Array<ForecastType>>(state => state.forecasts.forecasts)
	const filters = useSelector<AppStateType, ForecastsFiltersType>(state => state.forecasts.filters)


	const dispatch = useDispatch()
	const toggleFilterDispatch = (filterName: string, filtersBlockName: string) => {
		dispatch(toggleFilter(filterName, filtersBlockName))
	}

	let forecastId = props.match.params.forecastId ? props.match.params.forecastId : 1;


	return (
		<Forecasts
			forecasts={forecasts}
			filters={filters}
			toggleFilter={toggleFilterDispatch} 
		/>
	)
}

export default withRouter(ForecastsContainer);