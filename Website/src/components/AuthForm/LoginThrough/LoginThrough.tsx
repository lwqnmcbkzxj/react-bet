import React, { FC, useState, useEffect } from 'react';
import s from '../AuthForm.module.scss'
import { apiURL } from '../../../api/api';

import vkIcon from '../../../assets/img/vk-logo.png'
import fbIcon from '../../../assets/img/facebook-login-icon.png'
import googleIcon from '../../../assets/img/google-login-icon.png'
type LoginThroughPropsType = {
}
const LoginThrough: FC<LoginThroughPropsType> = ({ ...props }) => {
	return (
		<div className={s.loginThrough}>
			<a href={`${apiURL}/login/google`} className={s.login__link}>
				<img src={googleIcon} alt="google-icon" />
				<p>С помощью Google</p>
			</a>
			<a href={`${apiURL}/login/facebook`} className={s.login__link}>
				<img src={fbIcon} alt="facebook-icon" />
			</a>
			<a href={`${apiURL}/login/vkontakte`} className={s.login__link}>
				<img src={vkIcon} alt="vk-icon" />
			</a>
		</div>
	)
}

export default LoginThrough;