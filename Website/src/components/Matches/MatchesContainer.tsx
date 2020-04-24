import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import Matches from './Matches'

import {  } from '../../types/forecasts'


const MatchesContainer: FC = ({ ...props }) => {
	// const forecasts = useSelector<AppStateType, Array<ForecastType>>(state => state.forecasts.forecasts)

	const dispatch = useDispatch()

	// useEffect(() => {
	// 	dispatch(getMatchesFromServer(1, 15))		
	// }, []);


	return (
		<Matches
			// matches={matches}
		/>
	)
}

export default MatchesContainer;