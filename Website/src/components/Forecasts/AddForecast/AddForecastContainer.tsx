import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from '../../../types/types'
import AddForecast from './AddForecast'

import { withRouter, RouteComponentProps } from 'react-router'
import { toggleAuthFormVisiblility } from '../../../redux/app-reducer'



const AddForecastContainer: FC = (props) => {
	const logged = useSelector<AppStateType, boolean>(state => state.me.logged)
	// const dispatch = useDispatch()


	// useEffect(() => {
	// 	if (!logged) {
	// 		dispatch(toggleAuthFormVisiblility(true))
	// 	}
	// });

	return (

		logged ?
			<AddForecast />
			: <div></div>

	)
}

export default AddForecastContainer;