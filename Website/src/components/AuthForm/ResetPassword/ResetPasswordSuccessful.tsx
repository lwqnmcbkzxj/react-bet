import React, { FC } from 'react';
import s from '../AuthForm.module.scss';
import classNames from 'classnames'

type AuthFormPropsType = {
	changeAuthFormPhase: (phase: string) => void
}

const ResetPasswordSuccessful: FC<AuthFormPropsType> = ({ changeAuthFormPhase, ...props }) => {
	return (
		<form className={s.authForm}>
			<h1 className={s.resetSuccessful}>Ссылка на изменение пароля отправлена на почту!</h1>
		</form>
	);
}




export default ResetPasswordSuccessful;