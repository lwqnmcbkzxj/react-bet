import React, { FC } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { AppStateType, ForecastType } from '../../types/types'

import MainPage from './MainPage'


const HeaderConainer: FC = () => {
	const dispatch = useDispatch();
	const forecasts = useSelector<AppStateType, Array<ForecastType>>(state => state.forecasts.forecasts)


	return (
		<MainPage
			forecasts={forecasts}
		/>
	)
}

export default HeaderConainer;