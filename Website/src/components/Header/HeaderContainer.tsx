import React, { FC } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from '../../types/types'
import { toggleAuthFormVisiblility, toggleCommentsBlockVisibility } from '../../redux/app-reducer'


import DesktopHeader from './DesktopHeader/DesktopHeader'
import MobileHeader from './MobileHeader/MobileHeader'

import useMobile from '../../hooks/useMobile'

const HeaderConainer: FC = () => {
	const isCommentsBlockVisible = useSelector<AppStateType, boolean>(state => state.app.isCommentsBlockVisible);

	const dispatch = useDispatch();

	const toggleAuthFormVisiblilityDispatch = () => {
		dispatch(toggleAuthFormVisiblility())
	}
	const toggleCommentsBlockVisibilityDispatch = () => {
		dispatch(toggleCommentsBlockVisibility())
	}



	let isMobile = useMobile(480)

	let renderComponent

	if (isMobile) {
		renderComponent = <MobileHeader />
	} else {
		renderComponent =
			<DesktopHeader
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