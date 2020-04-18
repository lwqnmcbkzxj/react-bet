import React, { FC } from 'react'
import s from '../AuthForm.module.css'
import { Redirect } from 'react-router'
import { reduxForm, InjectedFormProps, SubmissionError } from 'redux-form'
import { Input, createField } from '../../Common/FormComponents/FormComponents'
import ActionButton from '../../Common/ActionButton/ActionButton'

// import LoginThrough from './LoginThrough/LoginThrough'

type AuthFormPropsType = {
	changeAuthFormPhase: (phase: string) => void
}
type LoginFormValuesType = {
	email: string
	password: string
}

const LoginForm: FC<InjectedFormProps<LoginFormValuesType>> = (props: any) => {
	return (
		<form onSubmit={props.handleSubmit}>
			{/* <div className={cn(s.formError, {[s.formError_active]: props.error})}>{props.error}</div> */}
			{props.error ? <div className={s.formError}>{props.error}</div> : null}
			<h1>Вход</h1>

			{createField("email", Input, "Ваша почта или никнейм")}
			{createField("password", Input, "Пароль", { type: "password", canSeeInputValue: true })}

			
			<div className={s.btnHolder}><ActionButton value="Войти"/></div>
		</form>
	);
}
const ReduxLoginForm = reduxForm<LoginFormValuesType>({ form: 'login' })(LoginForm)


const Login: FC<AuthFormPropsType> = (props) => {

	const login = (formData: LoginFormValuesType) => {
		console.log(formData)
		checkLoginSubmit(formData.email, formData.password)
	}

	const checkLoginSubmit = (email = "", password = "") => {
		if (email === '' || password === '')
			throw new SubmissionError({ _error: 'Заполните все поля' }) 
			

	}

	return (
		<>
			<ReduxLoginForm onSubmit={login} />

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