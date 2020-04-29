import React, { FC } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from '../../types/types'
import { toggleAuthFormVisiblility, toggleCommentsBlockVisibility } from '../../redux/app-reducer'
import { logout } from '../../redux/user-reducer'


import DesktopHeader from './DesktopHeader/DesktopHeader'
import MobileHeader from './MobileHeader/MobileHeader'

import useMobile from '../../hooks/useMobile'

const HeaderConainer: FC = () => {
	let loggedUserId = useSelector<AppStateType, number>(state => state.user.userInfo.id);
	const isCommentsBlockVisible = useSelector<AppStateType, boolean>(state => state.app.isCommentsBlockVisible);
	const logged = useSelector<AppStateType, boolean>(state => state.user.logged);

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
				loggedUserId={loggedUserId}

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