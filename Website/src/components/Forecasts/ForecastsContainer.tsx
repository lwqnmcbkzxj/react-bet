import React, { FC } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType, ForecastType } from '../../types/types'
import Forecasts from './Forecasts'

import { toggleFilter } from '../../redux/forecast-reducer'
import { ForecastFiltersType } from '../../types/types'

const ForecastsContainer: FC = ({ ...props }) => {
	const forecasts = useSelector<AppStateType, Array<ForecastType>>(state => state.forecasts.forecasts)
	const filters = useSelector<AppStateType, ForecastFiltersType>(state => state.forecasts.filters)


	const dispatch = useDispatch()
	const toggleFilterDispatch = (filterName: string, filtersBlockName: string) => {
		dispatch(toggleFilter(filterName, filtersBlockName))
	}

	return (
		<Forecasts
			forecasts={forecasts}
			filters={filters}
			toggleFilter={toggleFilterDispatch}
		/>
	)
}

export default ForecastsContainer;