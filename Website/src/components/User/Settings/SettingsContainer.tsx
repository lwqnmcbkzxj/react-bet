import React, { FC, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux"

import classNames from 'classnames'
import '../../../App.scss'
import { UserType as LoggedUserType } from '../../../types/me'
import { AppStateType } from '../../../types/types'

import Settings from './Settings'
import { withAuthRedirect } from '../../../hoc/withAuthRedirect'
import { LanguageType, languageEnum } from '../../../types/filters';
import { changeLanguage } from '../../../redux/app-reducer'

import { logout } from '../../../redux/me-reducer'
const SettingsContainer: FC = ({ ...props }) => {
	const loggedUser = useSelector<AppStateType, LoggedUserType>(state => state.me.userInfo)
	let languages = useSelector<AppStateType, Array<LanguageType>>(state => state.app.languages)
	const dispatch = useDispatch()

	const changeLanguageDispatch = (language: languageEnum) => {
		dispatch(changeLanguage(language))
	}
	const logoutDispatch = () => {
		dispatch(logout())
	}

	return (
		<Settings
			loggedUser={loggedUser}
			languages={languages}
			changeLanguage={changeLanguageDispatch}
			logout={logoutDispatch}
		/>
	)
}
export default
	withAuthRedirect(
	SettingsContainer
	);