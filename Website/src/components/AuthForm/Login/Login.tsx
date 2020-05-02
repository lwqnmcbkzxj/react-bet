import React, { FC } from 'react'
import s from '../AuthForm.module.scss'
import classNames from 'classnames'
import { Redirect } from 'react-router'
import { reduxForm, InjectedFormProps, SubmissionError } from 'redux-form'
import { Input, createField } from '../../Common/FormComponents/FormComponents'
import ActionButton from '../../Common/ActionButton/ActionButton'

import { emailRegExp } from '../../../types/types'
// import LoginThrough from './LoginThrough/LoginThrough'

type AuthFormPropsType = {
	login: (email: string, password: string) => void
	changeAuthFormPhase: (phase: string) => void
}
type LoginFormValuesType = {
	email: string
	password: string
}

const LoginForm: FC<InjectedFormProps<LoginFormValuesType>> = (props: any) => {
	return (
		<form onSubmit={props.handleSubmit} className={s.authForm}>
			<div className={classNames(s.formError, {[s.formError_active]: props.error})}>{props.error}</div>
			
			<h1>Вход</h1>

			{createField("email", Input, "Ваша почта или никнейм")}
			{createField("password", Input, "Пароль", { type: "password", canSeeInputValue: true })}

			
			<div className={s.btnHolder}><ActionButton value="Войти"/></div>
		</form>
	);
}
const ReduxLoginForm = reduxForm<LoginFormValuesType>({ form: 'login' })(LoginForm)


const Login: FC<AuthFormPropsType> = ({ login, ...props }) => {

	const handleLogin = (formData: LoginFormValuesType) => {
		if (!formData.email || !formData.password) 		
			throw new SubmissionError({ _error: 'Заполните все поля' })
		else if (!formData.email.match(emailRegExp))
			throw new SubmissionError({ _error: 'Введен некорректный email' })
		else if (formData.password.length < 8){
			throw new SubmissionError({ _error: 'Длина пароля должна быть не меньше 8 символов' })
		} else {
			login(formData.email, formData.password)
			throw new SubmissionError({ _error: '' })
		}
	}

	
	return (
		<>
			<ReduxLoginForm onSubmit={handleLogin} />

			<div className={s.orLine}><p>или</p></div>

			{/* <LoginThrough /> */}
			<div className={s.actions}>
				<p><button onClick={() => { props.changeAuthFormPhase('reset-password') }}>
					Забыли пароль?</button></p>

				<p>Еще не аккаунта? <button onClick={() => { props.changeAuthFormPhase('register') }}>
					Зарегистрируйтесь</button></p>
			</div>
		</>
	);
}



export default Login;