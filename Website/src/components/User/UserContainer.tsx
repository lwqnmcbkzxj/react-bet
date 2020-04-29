import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from '../../types/types'
import { UserType } from '../../types/users'
import { UserType as LoggedUserType } from '../../types/user'

import User from './User'
import { withRouter, RouteComponentProps, Redirect } from 'react-router'
import { toggleAuthFormVisiblility } from '../../redux/app-reducer'
import { getForecastsFromServer } from '../../redux/forecasts-reducer'
import { ForecastType } from '../../types/forecasts'

interface MatchParams {
	userId: string;
}

interface Props extends RouteComponentProps<MatchParams> { }

const UsersContainer: FC<Props> = ({ ...props }) => {
	const currentUser = useSelector<AppStateType, UserType>(state => state.users.currentUser)
	const loggedUser = useSelector<AppStateType, LoggedUserType>(state => state.user.userInfo)
	const logged = useSelector<AppStateType, boolean>(state => state.user.logged)
	const forecasts = useSelector<AppStateType, Array<ForecastType>>(state => state.forecasts.forecasts)

	const dispatch = useDispatch()
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
	

	return (
		(isLoggedUserProfile && logged) || (!isLoggedUserProfile) ?
			<User
				forecasts={forecasts}
				isLoggedUserProfile={isLoggedUserProfile}
				user={currentUser}
				getUserFavourites={getUserFavourites}
				getUserForecasts={getUserForecasts}
			/>
			: <div></div>
	)
}

export default withRouter(UsersContainer);