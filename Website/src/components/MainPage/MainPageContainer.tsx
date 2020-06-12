import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from '../../types/types'
import { ForecastType } from '../../types/forecasts'
import { setMainPageBlocksVisibility, changeMainPageBlockVisibility } from '../../redux/app-reducer'

import MainPage from './MainPage'

import { getForecastsFromServer } from '../../redux/forecasts-reducer'
import { getMatchesFromServer } from '../../redux/matches-reducer'
import { getUsersFromServer } from '../../redux/users-reducer'
import { getActiveFilter } from '../../utils/getActiveFilter'
import { MatchType } from '../../types/matches';
import { BookmakerType } from '../../types/bookmakers';
import { UserType } from '../../types/users';
import { getBookmakersFromServer } from '../../redux/bookmakers-reducer';
import { timeFilterEnum, FiltersObjectType } from '../../types/filters';

const MainPageContainer: FC = () => {
	const dispatch = useDispatch();
	const users = useSelector<AppStateType, Array<UserType>>(state => state.users.users)
	const matches = useSelector<AppStateType, Array<MatchType>>(state => state.matches.matches)
	const forecasts = useSelector<AppStateType, Array<ForecastType>>(state => state.forecasts.forecasts)
	const bookmakers = useSelector<AppStateType, Array<BookmakerType>>(state => state.bookmakers.bookmakers)

	const mainPageBlocksVisibility = useSelector<AppStateType, Array<ForecastType>>(state => state.app.mainPageBlocksVisibility)

	const notification = useSelector<AppStateType, string>(state => state.app.options.main_page_notification)
	
	const setMainPageBlocksVisibilityDispatch = (blockNames: Array<string>) => {
		dispatch(setMainPageBlocksVisibility(blockNames))
	}
	const changeMainPageBlockVisibilityDispatch = (blockName: string) => {
		dispatch(changeMainPageBlockVisibility(blockName))
	}

	const usersFilters = useSelector<AppStateType, FiltersObjectType>(state => state.users.filters)
	let activeSportFilter = getActiveFilter(usersFilters, 'sportTypeFilter')
	let activeTimeFilter = 	getActiveFilter(usersFilters, 'timeFilter')
	
	useEffect(() => {
		dispatch(getForecastsFromServer(1, 5))	
		dispatch(getUsersFromServer(1, 15, { time: activeTimeFilter, sport: activeSportFilter }))	
		dispatch(getMatchesFromServer(1, 5))		
		dispatch(getBookmakersFromServer(1, 5))		
	}, []);



	return (
		<MainPage
			users={users}
			forecasts={forecasts}
			matches={matches}
			bookmakers={bookmakers}
			mainPageBlocksVisibility={mainPageBlocksVisibility}
			setMainPageBlocksVisibility={setMainPageBlocksVisibilityDispatch}
			changeMainPageBlockVisibility={changeMainPageBlockVisibilityDispatch}

			notification={notification}
		/>
	)
}

export default MainPageContainer;