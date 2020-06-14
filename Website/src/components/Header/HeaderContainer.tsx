import React, { FC } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from '../../types/types'
import { toggleAuthFormVisiblility, toggleCommentsBlockVisibility } from '../../redux/app-reducer'
import { setSearchText } from '../../redux/forecasts-reducer'
import { logout } from '../../redux/me-reducer'

import { UserType } from '../../types/me'

import DesktopHeader from './DesktopHeader/DesktopHeader'
import MobileHeader from './MobileHeader/MobileHeader'

import useMobile from '../../hooks/useMobile'
import { RouteComponentProps, withRouter } from 'react-router';

const HeaderConainer: FC<RouteComponentProps> = (props) => {
	const isCommentsBlockVisible = useSelector<AppStateType, boolean>(state => state.app.isCommentsBlockVisible);
	const logged = useSelector<AppStateType, boolean>(state => state.me.logged);
	let user = useSelector<AppStateType, UserType>(state => state.me.userInfo);
	const searchText = useSelector<AppStateType, string>(state => state.forecasts.searchText)
	const dispatch = useDispatch();

	const toggleAuthFormVisiblilityDispatch = () => {
		dispatch(toggleAuthFormVisiblility())
	}
	const toggleCommentsBlockVisibilityDispatch = () => {
		dispatch(toggleCommentsBlockVisibility())
	}
	const logoutDispatch = () => {
		dispatch(logout())
	}
	const setSearchTextDispatch = (searchText: string) => {
		dispatch(setSearchText(searchText))
	}
	const handleSearch = () => {
		props.history.push('/forecasts')
	}


	let isMobile = useMobile(640)

	let renderComponent

	let searchObj = {
		searchText: searchText,
		handleSearchTextChange: setSearchTextDispatch,
		handleSearch: handleSearch
	}

	if (isMobile) {
		renderComponent =
			<MobileHeader
				logged={logged}
				user={user}

				search={searchObj}
			/>
	} else {
		renderComponent =
			<DesktopHeader
				logged={logged}
				logout={logoutDispatch}
				user={user}

				isCommentsBlockVisible={isCommentsBlockVisible}
				toggleAuthFormVisiblility={toggleAuthFormVisiblilityDispatch}
				toggleCommentsBlockVisibility={toggleCommentsBlockVisibilityDispatch}

				search={searchObj}
			/>
	}
	return (
		<>
			{renderComponent}
		</>
	)
}

export default withRouter(HeaderConainer);