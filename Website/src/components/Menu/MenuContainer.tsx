import React, { FC } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from '../../types/types'
import Menu from './DesktopMenu/DesktopMenu'
import MobileMenu from './MobileMenu/MobileMenu'

import useMobile from '../../hooks/useMobile'

import { toggleFilter } from '../../redux/forecasts-reducer'


const MenuContainer: FC = ({ ...props }) => {
	let isMobile = useMobile(768)

	const dispatch = useDispatch()

	const toggleFilterDispatch = (filterName: string, filtersBlockName: string) => {
		dispatch(toggleFilter(filterName, filtersBlockName))
	}

	return (
		isMobile ? <MobileMenu /> :
			<Menu
				toggleFilter={toggleFilterDispatch}
			/>
	)
}

export default MenuContainer;