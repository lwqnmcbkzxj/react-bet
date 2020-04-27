import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from '../../types/types'
import { ForecastType } from '../../types/forecasts'
import { setMainPageBlocksVisibility, changeMainPageBlockVisibility } from '../../redux/app-reducer'

import MainPage from './MainPage'

import { getForecastsFromServer } from '../../redux/forecasts-reducer'
import { getActiveFilter } from '../../utils/getActiveFilter'
import { MatchType } from '../../types/matches';
import { BookmakerType } from '../../types/bookmakers';
import { UserType } from '../../types/users';

const MainPageContainer: FC = () => {
	const dispatch = useDispatch();
	const users = useSelector<AppStateType, Array<UserType>>(state => state.users.users)
	const matches = useSelector<AppStateType, Array<MatchType>>(state => state.matches.matches)
	const forecasts = useSelector<AppStateType, Array<ForecastType>>(state => state.forecasts.forecasts)
	const bookmakers = useSelector<AppStateType, Array<BookmakerType>>(state => state.bookmakers.bookmakers)

	const mainPageBlocksVisibility = useSelector<AppStateType, Array<ForecastType>>(state => state.app.mainPageBlocksVisibility)

	
	const setMainPageBlocksVisibilityDispatch = (blockNames: Array<string>) => {
		dispatch(setMainPageBlocksVisibility(blockNames))
	}
	const changeMainPageBlockVisibilityDispatch = (blockName: string) => {
		dispatch(changeMainPageBlockVisibility(blockName))
	}


	useEffect(() => {
		dispatch(getForecastsFromServer(1, 5))		
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
		/>
	)
}

export default MainPageContainer;