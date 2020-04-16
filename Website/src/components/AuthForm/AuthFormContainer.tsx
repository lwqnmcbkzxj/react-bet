import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AuthForm from './AuthForm'
import { AppStateType } from '../../types/types'

import { toggleAuthFormVisiblility } from '../../redux/app-reducer' 

const AuthFormContainer: FC = ({ ...props }) => {
	const isAuthFormVisible = useSelector<AppStateType, boolean>(state => state.app.isAuthFormVisible);
	const dispatch = useDispatch();

	const toggleAuthFormVisibleDispatch = () => {
		dispatch(toggleAuthFormVisiblility())
	}
	return (
		<AuthForm
			isAuthFormVisible={isAuthFormVisible}
			toggleAuthFormVisiblility={toggleAuthFormVisibleDispatch}
		/>
	)
}

export default AuthFormContainer;