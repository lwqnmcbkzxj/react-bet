import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import Forecasts from './Forecasts'

import { toggleFilter, getForecastsFromServer } from '../../redux/forecasts-reducer'

import { ForecastType } from '../../types/forecasts'
import { FiltersObjectType, FilterNames } from '../../types/filters'

import { withRouter, RouteComponentProps  } from 'react-router'

import {getActiveFilter } from '../../utils/getActiveFilter'
import { UserType } from '../../types/me'
interface MatchParams {
    forecastId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const ForecastsContainer: FC<Props> = ({ ...props }) => {
	const forecasts = useSelector<AppStateType, Array<ForecastType>>(state => state.forecasts.forecasts)
	const filters = useSelector<AppStateType, FiltersObjectType>(state => state.forecasts.filters)

	// For subscribtion filters
	const loggedUser = useSelector<AppStateType, UserType>(state => state.me.userInfo)
	const logged = useSelector<AppStateType, boolean>(state => state.me.logged)

	const dispatch = useDispatch()

	let activeSportFilter = getActiveFilter(filters, 'sportTypeFilter')
	let activeSubscriptionFilter = getActiveFilter(filters, 'subscriptionFilter')
	let activeTimeFilter = 	getActiveFilter(filters, 'timeFilter')

	debugger
	let options = {
		sport: activeSportFilter,
		time: activeTimeFilter,
		subscribtion: activeSubscriptionFilter,
		loggedUserId: loggedUser.id
	}

	useEffect(() => {
		dispatch(getForecastsFromServer(1, 15, options))		
	}, [filters]);

	const toggleFilterDispatch = (filterName: FilterNames, filtersBlockName: string) => {
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

export default withRouter(ForecastsContainer);