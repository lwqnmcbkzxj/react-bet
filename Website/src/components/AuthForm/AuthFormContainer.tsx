import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AuthForm from './AuthForm'
import { AppStateType } from '../../types/types'

import { toggleAuthFormVisiblility, setShouldRedirect } from '../../redux/app-reducer' 
import { login, register, resetPassword } from '../../redux/me-reducer'
import { Redirect } from 'react-router';

const AuthFormContainer: FC = ({ ...props }) => {
	const isAuthFormVisible = useSelector<AppStateType, boolean>(state => state.app.isAuthFormVisible);
	const logged = useSelector<AppStateType, boolean>(state => state.me.logged);

	const redirectLink = useSelector<AppStateType, string>(state => state.app.redirectLink);
	const shouldRedirect = useSelector<AppStateType, boolean>(state => state.app.shouldRedirect);

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

	useEffect(() => {
		if (isAuthFormVisible) {
			toggleAuthFormVisibleDispatch()
		}
	}, [logged]);



	useEffect(() => {
		if (shouldRedirect) {
			setShouldRedirect(false)
		}
	}, [shouldRedirect]);
	
	if (shouldRedirect && redirectLink !== "")
		return <Redirect to={`${redirectLink}`} />
	
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