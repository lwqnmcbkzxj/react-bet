import React, { FC } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from '../../types/types'
import { toggleAuthFormVisiblility, toggleCommentsBlockVisibility } from '../../redux/app-reducer'
import { logout } from '../../redux/me-reducer'

import { UserType } from '../../types/me'

import DesktopHeader from './DesktopHeader/DesktopHeader'
import MobileHeader from './MobileHeader/MobileHeader'

import useMobile from '../../hooks/useMobile'

const HeaderConainer: FC = () => {
	const isCommentsBlockVisible = useSelector<AppStateType, boolean>(state => state.app.isCommentsBlockVisible);
	const logged = useSelector<AppStateType, boolean>(state => state.me.logged);
	let user = useSelector<AppStateType, UserType>(state => state.me.userInfo);

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


	let isMobile = useMobile(640)

	let renderComponent

	if (isMobile) {
		renderComponent = <MobileHeader
			logged={logged}
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
			/>
	}
	return (
		<>
			{renderComponent}
		</>
	)
}

export default HeaderConainer;