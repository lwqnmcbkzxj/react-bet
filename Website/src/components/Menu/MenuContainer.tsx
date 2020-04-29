import React, { FC } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from '../../types/types'
import Menu from './DesktopMenu/DesktopMenu'
import MobileMenu from './MobileMenu/MobileMenu'

import useMobile from '../../hooks/useMobile'

import { toggleFilter } from '../../redux/forecasts-reducer'


const MenuContainer: FC = ({ ...props }) => {
	let isMobile = useMobile(768)
	let loggedUserId = useSelector<AppStateType, number>(state => state.user.userInfo.id);
	const dispatch = useDispatch()

	const toggleFilterDispatch = (filterName: string, filtersBlockName: string) => {
		dispatch(toggleFilter(filterName, filtersBlockName))
	}

	return (
		isMobile ? <MobileMenu
			loggedUserId={loggedUserId}/> :
			<Menu
				toggleFilter={toggleFilterDispatch}
			/>
	)
}

export default MenuContainer;