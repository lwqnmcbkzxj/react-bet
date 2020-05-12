import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from '../../types/types'
import { UserType } from '../../types/user'
import { UserType as LoggedUserType } from '../../types/me'

import User from './User'
import { withRouter, RouteComponentProps, Redirect } from 'react-router'
import { toggleAuthFormVisiblility } from '../../redux/app-reducer'
import { getForecastsFromServer } from '../../redux/forecasts-reducer'
import { ForecastType } from '../../types/forecasts'
import { FiltersObjectType, FilterNames } from '../../types/filters'
import { changeUserPageActiveTab } from '../../redux/app-reducer'

import { getActiveFilter } from '../../utils/getActiveFilter'
import { toggleFilter, getUserFromServer, subscribeUser } from '../../redux/user-reducer'
interface MatchParams {
	userId: string;
}

interface Props extends RouteComponentProps<MatchParams> { }

const UsersContainer: FC<Props> = ({ ...props }) => {
	const activeUserProfileTab = useSelector<AppStateType, string>(state => state.app.activeProfileTab)
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


	const toggleFilterDispatch = (filterName: FilterNames, filtersBlockName: string) => {
		dispatch(toggleFilter(filterName, filtersBlockName))
	}

	const changeVisibleTab = (tabName: string) => {
		dispatch(changeUserPageActiveTab(tabName))
	}


	let userId = props.match.params.userId ? props.match.params.userId : 1;
	useEffect(() => {
		dispatch(getUserFromServer(+userId))		
	}, [filters]);

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

	

	const subscribe = (id: number) => {
		if (!logged) {
			dispatch(toggleAuthFormVisiblility())
			return 0
		} else {
			dispatch(subscribeUser(id))
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
				visibleTab={activeUserProfileTab}
				changeVisibleTab={changeVisibleTab}
			/>
			: <div></div>
	)
}

export default withRouter(UsersContainer);