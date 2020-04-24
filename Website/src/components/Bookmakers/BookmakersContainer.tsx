import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import Bookmakers from './Bookmakers'

// import {  } from '../../types/bookmakers'


const BookmakersContainer: FC = ({ ...props }) => {
	// const forecasts = useSelector<AppStateType, Array<ForecastType>>(state => state.forecasts.forecasts)

	const dispatch = useDispatch()

	// useEffect(() => {
	// 	dispatch(getMatchesFromServer(1, 15))		
	// }, []);


	return (
		<Bookmakers
			// matches={matches}
		/>
	)
}

export default BookmakersContainer;