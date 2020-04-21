import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from '../../types/types'
import { ForecastType } from '../../types/forecasts'
import { setMainPageBlocksVisibility, changeMainPageBlockVisibility } from '../../redux/app-reducer'

import MainPage from './MainPage'

import {getForecastsFromServer } from '../../redux/forecasts-reducer'

const HeaderConainer: FC = () => {
	const dispatch = useDispatch();
	const forecasts = useSelector<AppStateType, Array<ForecastType>>(state => state.forecasts.forecasts)
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
			forecasts={forecasts}
			mainPageBlocksVisibility={mainPageBlocksVisibility}
			setMainPageBlocksVisibility={setMainPageBlocksVisibilityDispatch}
			changeMainPageBlockVisibility={changeMainPageBlockVisibilityDispatch}
		/>
	)
}

export default HeaderConainer;