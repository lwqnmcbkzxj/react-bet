import React, { FC } from 'react';
import s from '../AuthForm.module.scss';
import classNames from 'classnames'

import { Redirect } from 'react-router';

import { reduxForm, InjectedFormProps, SubmissionError } from 'redux-form'
import { Input, createField } from '../../Common/FormComponents/FormComponents';
import ActionButton from '../../Common/ActionButton/ActionButton'

// import LoginThrough from './LoginThrough/LoginThrough'

const RegisterForm = (props: any) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div className={classNames(s.formError, { [s.formError_active]: props.error })}>{props.error}</div>
			<h1>Восстановление пароля</h1>

			{createField("email", Input, "Ваша почта или никнейм")}

			<div className={s.btnHolder}><ActionButton value="Восстановить" /></div>
		</form>
	);
}
const ReduxPasswordResetForm = reduxForm({ form: 'reset-password' })(RegisterForm)

type AuthFormPropsType = {
	changeAuthFormPhase: (phase: string) => void
	resetPassword: (email: string) => void

}


const PasswordReset: FC<AuthFormPropsType> = ({ resetPassword, changeAuthFormPhase, ...props }) => {
	const handleReset = (formData: any) => {
		if (formData.email === '')
			throw new SubmissionError({ _error: 'Заполните все поля' })
		else {
			resetPassword(formData.email)
			throw new SubmissionError({ _error: '' })
		}
	}

	return (
		<>
			<ReduxPasswordResetForm onSubmit={handleReset} />

			<div className={s.orLine}><p>или</p></div>

			{/* <LoginThrough /> */}
		</>
	);
}




export default PasswordReset;