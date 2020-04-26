import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AuthForm from './AuthForm'
import { AppStateType } from '../../types/types'

import { toggleAuthFormVisiblility } from '../../redux/app-reducer' 
import { login, register, resetPassword } from '../../redux/user-reducer'

const AuthFormContainer: FC = ({ ...props }) => {
	const isAuthFormVisible = useSelector<AppStateType, boolean>(state => state.app.isAuthFormVisible);
	const logged = useSelector<AppStateType, boolean>(state => state.user.logged);
	const dispatch = useDispatch();

	const toggleAuthFormVisibleDispatch = () => {
		dispatch(toggleAuthFormVisiblility())
	}

	const loginDispatch = (email: string, password: string) => {
		dispatch(login(email, password))
	}
	const registerDispatch = (username: string, email: string, password: string) => {
		dispatch(register(username, email, password))
	}
	const resetPasswordDispatch = (email: string) => {
		dispatch(resetPassword(email))
	}

	// 
	useEffect(() => {
		if (isAuthFormVisible)
			toggleAuthFormVisibleDispatch()
	}, [logged]);
	
	return (
		<AuthForm
			isAuthFormVisible={isAuthFormVisible}
			toggleAuthFormVisiblility={toggleAuthFormVisibleDispatch}
			resetPassword={resetPasswordDispatch}
			login={loginDispatch}
			register={registerDispatch}
		/>
	)
}

export default AuthFormContainer;