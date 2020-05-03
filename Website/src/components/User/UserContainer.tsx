import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from '../../types/types'
import { UserType } from '../../types/users'
import { UserType as LoggedUserType } from '../../types/me'

import User from './User'
import { withRouter, RouteComponentProps, Redirect } from 'react-router'
import { toggleAuthFormVisiblility } from '../../redux/app-reducer'
import { getForecastsFromServer } from '../../redux/forecasts-reducer'
import { ForecastType } from '../../types/forecasts'
import { FiltersObjectType, FilterNames } from '../../types/filters'



import { getActiveFilter } from '../../utils/getActiveFilter'

import { toggleFilter } from '../../redux/user-reducer'
interface MatchParams {
	userId: string;
}

interface Props extends RouteComponentProps<MatchParams> { }

const UsersContainer: FC<Props> = ({ ...props }) => {
	const currentUser = useSelector<AppStateType, UserType>(state => state.user.currentUser)
	const loggedUser = useSelector<AppStateType, LoggedUserType>(state => state.me.userInfo)
	const logged = useSelector<AppStateType, boolean>(state => state.me.logged)
	const forecasts = useSelector<AppStateType, Array<ForecastType>>(state => state.forecasts.forecasts)
	const filters = useSelector<AppStateType, FiltersObjectType>(state => state.user.filters)

	const dispatch = useDispatch()


	// let activeTimeFilter = getActiveFilter(filters, 'timeFilter')
	// let options = {		
	// 	tf: activeTimeFilter
	// }

	// useEffect(() => {
	// 	dispatch(getUserDataFromServer(userId, options))		
	// }, [filters]);

	const toggleFilterDispatch = (filterName: FilterNames, filtersBlockName: string) => {
		dispatch(toggleFilter(filterName, filtersBlockName))
	}




	let userId = props.match.params.userId ? props.match.params.userId : 1;
	if (+userId === 0)
		return <Redirect to={`/forecasters/${loggedUser.id}`} />
	
	let isLoggedUserProfile = (+userId === loggedUser.id)



	const getUserForecasts = () => {
		dispatch(getForecastsFromServer(1, 15))
	}
	const getUserFavourites = () => {
		dispatch(getForecastsFromServer(1, 15
			// , { useFavourites: true }
		))
	}

	

	const subscribe = () => {
		if (!logged) {
			dispatch(toggleAuthFormVisiblility())
			return 0
		} else {
			console.log('sub')
		}
	}





	return (
		(isLoggedUserProfile && logged) || (!isLoggedUserProfile) ?
			<User
				forecasts={forecasts}
				isLoggedUserProfile={isLoggedUserProfile}
				user={currentUser}
				loggedUser={loggedUser}
				getUserFavourites={getUserFavourites}
				getUserForecasts={getUserForecasts}
				subscribe={subscribe}

				filters={filters}
				toggleFilter={toggleFilterDispatch}
			/>
			: <div></div>
	)
}

export default withRouter(UsersContainer);