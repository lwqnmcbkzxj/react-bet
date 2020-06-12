import React, { FC, useEffect, useState, useReducer } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from '../../types/types'
import Forecasts from './Forecasts'

import { toggleFilter, getForecastsFromServer } from '../../redux/forecasts-reducer'
import { setPaginationPage } from '../../redux/app-reducer'

import { ForecastType } from '../../types/forecasts'
import { FiltersObjectType, FilterNames } from '../../types/filters'

import { withRouter, RouteComponentProps } from 'react-router'

import { getActiveFilter } from '../../utils/getActiveFilter'
import { UserType } from '../../types/me'
interface MatchParams {
	forecastId: string;
}

interface Props extends RouteComponentProps<MatchParams> { }

const ForecastsContainer: FC<Props> = ({ ...props }) => {
	const dispatch = useDispatch()

	const forecasts = useSelector<AppStateType, Array<ForecastType>>(state => state.forecasts.forecasts)
	const filters = useSelector<AppStateType, FiltersObjectType>(state => state.forecasts.filters)
	const searchText = useSelector<AppStateType, string>(state => state.forecasts.searchText)

	const page = useSelector<AppStateType, number>(state => state.app.paginationObject.forecasts.page)
	const limit = useSelector<AppStateType, number>(state => state.app.paginationObject.forecasts.limit)

	// For subscribtion filters
	const loggedUser = useSelector<AppStateType, UserType>(state => state.me.userInfo)

	let activeSportFilter = getActiveFilter(filters, 'sportTypeFilter')
	let activeSubscriptionFilter = getActiveFilter(filters, 'subscriptionFilter')
	let activeTimeFilter = getActiveFilter(filters, 'timeFilter')

	let options = {
		sport: activeSportFilter,
		time: activeTimeFilter,
		subscribtion: activeSubscriptionFilter,
		loggedUserId: loggedUser.id,
		search: searchText
	}

	useEffect(() => {
		dispatch(getForecastsFromServer(page, limit, options))
	}, [filters, limit, page]);

	const toggleFilterDispatch = (filterName: FilterNames, filtersBlockName: string) => {
		dispatch(setPaginationPage(1, 'forecasts'))
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