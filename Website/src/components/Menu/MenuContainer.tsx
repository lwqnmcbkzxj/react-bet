import React, { FC } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppStateType, SportType } from '../../types/types'
import { FilterNames } from '../../types/filters'
import Menu from './DesktopMenu/DesktopMenu'
import MobileMenu from './MobileMenu/MobileMenu'

import useMobile from '../../hooks/useMobile'

import { toggleFilter } from '../../redux/forecasts-reducer'


const MenuContainer: FC = ({ ...props }) => {
	let isMobile = useMobile(768)
	const dispatch = useDispatch()

	let sports = useSelector<AppStateType, Array<SportType>>(state => state.app.sports)
	let loggedUserId = useSelector<AppStateType, number>(state => state.me.userInfo.id);

	const toggleFilterDispatch = (filterName: FilterNames, filtersBlockName: string) => {
		dispatch(toggleFilter(filterName, filtersBlockName))
	}

	return (
		isMobile ? <MobileMenu
			loggedUserId={loggedUserId}/> :
			<Menu
				toggleFilter={toggleFilterDispatch}
				sports={sports}
			/>
	)
}

export default MenuContainer;