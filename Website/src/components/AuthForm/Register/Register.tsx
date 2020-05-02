import React, { FC } from 'react';
import s from '../AuthForm.module.scss';
import classNames from 'classnames'

import { Redirect } from 'react-router';

import { reduxForm, InjectedFormProps, SubmissionError } from 'redux-form'
import { Input, createField } from '../../Common/FormComponents/FormComponents'
import ActionButton from '../../Common/ActionButton/ActionButton'
import { emailRegExp } from '../../../types/types'

// import LoginThrough from './LoginThrough/LoginThrough'

type AuthFormPropsType = {
	register: (username: string, email: string, password: string) => void
	changeAuthFormPhase: (phase: string) => void
}
type RegisterFormValuesType = {
	username: string
	email: string
	password: string
	password_repeat: string
}




const RegisterForm = (props: any) => {
	return (
		<form onSubmit={props.handleSubmit} className={s.authForm}>
			<div className={classNames(s.formError, { [s.formError_active]: props.error })}>{props.error}</div>
			<h1>Регистрация</h1>

			{createField("username", Input, "Ваш никнейм")}
			{createField("email", Input, "Ваша почта")}
			{createField("password", Input, "Пароль", { type: "password" })}
			{createField("password_repeat", Input, "Повторите пароль", { type: "password" })}

			<div className={s.btnHolder}><ActionButton value="Зарегистрироваться" /></div>
		</form>
	);
}
const ReduxRegisterForm = reduxForm({ form: 'register' })(RegisterForm)




const Register: FC<AuthFormPropsType> = ({ register, changeAuthFormPhase, ...props }) => {
	const handleRegister = (formData: any) => {
		if (!formData.email || !formData.password || !formData['password_repeat'] || !formData.username)
			throw new SubmissionError({ _error: 'Заполните все поля' })
		else if (!formData.email.match(emailRegExp))
			throw new SubmissionError({ _error: 'Введен некорректный email' })
		else if (formData.password.length <= 8){
			throw new SubmissionError({ _error: 'Длина пароля должна быть больше 8 символов' })
		} else if (formData.password !== formData['password_repeat']){
			throw new SubmissionError({ _error: 'Пароли должны совпадать' })
		} else {
			register(formData.username, formData.email, formData.password)
			throw new SubmissionError({ _error: '' })
		}
	}

	return (
		<>
			<ReduxRegisterForm onSubmit={handleRegister} />

			<div className={s.orLine}><p>или</p></div>

			{/* <LoginThrough /> */}
			<div className={s.actions}>
				<p>У вас есть аккаунт? <button onClick={() => { changeAuthFormPhase('login') }}>
					Войдите</button></p>
			</div>
		</>
	);
}





export default Register;