import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"

import classNames from 'classnames'
import '../../../App.scss'
import { UserType as LoggedUserType } from '../../../types/user'
import { AppStateType } from '../../../types/types'

import Settings from './Settings'
import { withAuthRedirect } from '../../../hoc/withAuthRedirect' 

const SettingsContainer: FC = ({ ...props }) => {
	const loggedUser = useSelector<AppStateType, LoggedUserType>(state => state.user.userInfo)
	
	return (
		<Settings
			loggedUser={loggedUser}
		/>
	)
}
export default withAuthRedirect(SettingsContainer);