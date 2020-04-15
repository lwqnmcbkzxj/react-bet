import React, { FC, useState, useEffect } from 'react';
import s from './AuthForm.module.css'
import cn from 'classnames'

import Login from './Login/Login'
import Register from './Register/Register';
import ResetPassword from './ResetPassword/ResetPassword';

import logo from '../../assets/img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

type AuthFormPropsType = {
	isAuthFormVisible: boolean
	toggleAuthFormVisible: () => void
}
const AuthFormContainer: FC<AuthFormPropsType> = ({ isAuthFormVisible, toggleAuthFormVisible, ...props }) => {
	const [authFormPhase, setAuthFormPhase] = useState('login')

	useEffect(() => {
		if (isAuthFormVisible)
			changeAuthFormPhase('login')
	}, [isAuthFormVisible]);
	const changeAuthFormPhase = (phase: string) => {
		setAuthFormPhase(phase)
	}

	let visibleFormBlock;
	if (authFormPhase === 'login') {
		visibleFormBlock = <Login changeAuthFormPhase={changeAuthFormPhase} />
	} else if (authFormPhase === 'register') {
		visibleFormBlock = <Register changeAuthFormPhase={changeAuthFormPhase} />
	} else if (authFormPhase === 'reset-password') {
		visibleFormBlock = <ResetPassword changeAuthFormPhase={changeAuthFormPhase}/>
	}
	return (
		<>
			<div className={cn(s.authBlock, { [s.authBlock_visible]: isAuthFormVisible })}>
				<div className={s.authHeader}>
					<img src={logo} alt="logo" />
					<FontAwesomeIcon icon={faTimes} className={s.closePopup} onClick={toggleAuthFormVisible} />
				</div>
				<div className={s.authForm}>{visibleFormBlock}</div>
			</div>
			<div className={s.auth_bg} onClick={isAuthFormVisible ? toggleAuthFormVisible : () => { }}></div>
		</>
	)
}

export default AuthFormContainer;