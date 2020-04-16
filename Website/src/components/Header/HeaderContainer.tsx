import React, { FC } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { AppStateType } from '../../types/types'
import { toggleAuthFormVisiblility, toggleCommentsBlockVisibility } from '../../redux/app-reducer'


import Header from './Header'


const HeaderConainer: FC = () => {
	const isCommentsBlockVisible = useSelector<AppStateType, boolean>(state => state.app.isCommentsBlockVisible);

	const dispatch = useDispatch();

	const toggleAuthFormVisiblilityDispatch = () => {
		dispatch(toggleAuthFormVisiblility())
	}
	const toggleCommentsBlockVisibilityDispatch = () => {
		dispatch(toggleCommentsBlockVisibility())
	}
	return (
		<Header
			isCommentsBlockVisible={isCommentsBlockVisible}
			toggleAuthFormVisiblility={toggleAuthFormVisiblilityDispatch}
			toggleCommentsBlockVisibility={toggleCommentsBlockVisibilityDispatch}
		/>
	)
}

export default HeaderConainer;