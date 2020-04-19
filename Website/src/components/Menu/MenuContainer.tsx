import React, { FC } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { AppStateType } from '../../types/types'
import Menu from './DesktopMenu/DesktopMenu'
import MobileMenu from './MobileMenu/MobileMenu'

import useMobile from '../../hooks/useMobile'


type MenuContainerProps = {
	
}

const MenuContainer: FC<MenuContainerProps> = ({ ...props }) => {
	let isMobile = useMobile(768)

	return (
		isMobile ? <MobileMenu />  : <Menu />
	)
}

export default MenuContainer;