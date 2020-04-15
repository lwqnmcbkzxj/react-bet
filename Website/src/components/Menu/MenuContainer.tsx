import React, { FC } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { AppStateType } from '../../types/types'

import Menu from './Menu'

type MenuContainerProps = {
	
}

const MenuContainer: FC<MenuContainerProps> = ({ ...props }) => {
	return (
		<Menu
			
		/>
	)
}

export default MenuContainer;