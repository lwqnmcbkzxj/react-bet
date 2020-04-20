import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppStateType, ForecastType } from '../../types/types'
import { setMainPageBlocksVisibility, changeMainPageBlockVisibility } from '../../redux/app-reducer'

import MainPage from './MainPage'


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