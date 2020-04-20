import React from 'react';
import s from '../AuthForm.module.scss';
import classNames from 'classnames'

import { Redirect } from 'react-router';

import { reduxForm } from 'redux-form';
import { Input, createField } from '../../Common/FormComponents/FormComponents';
import ActionButton from '../../Common/ActionButton/ActionButton'

// import LoginThrough from './LoginThrough/LoginThrough'

const RegisterForm = (props: any) => {
	return (
		<div className={s.registerForm}>
			<form onSubmit={props.handleSubmit}>
			<div className={classNames(s.formError, {[s.formError_active]: props.error})}>{props.error}</div>
				<h1>Регистрация</h1>

				{createField("email", Input, "Ваша почта или никнейм" )  }
				{createField("password", Input, "Пароль", { type: "password" })}
				{createField("password-repeat", Input, "Повторите пароль", { type: "password" })}
				
				<div className={s.btnHolder}><ActionButton value="Зарегистрироваться"/></div>
			</form>
		</div>
	);
}
const ReduxRegisterForm = reduxForm({ form: 'register' })(RegisterForm)

type AuthFormPropsType = {
	changeAuthFormPhase: (phase: string) => void
}

class Register extends React.Component<AuthFormPropsType> {
	// componentDidMount() {
	//     this.props.authUser();
	// }
	// login = (formData) => {
	//     this.props.login(formData.email, formData.password);
	// }
	render() {
		// if (this.props.logged) {
		//     return <Redirect to={"/course"} />
		// }

		return (
			<div >
				<ReduxRegisterForm onSubmit={() => console.log('s')} />

				<div className={s.orLine}><p>или</p></div>
				
				{/* <LoginThrough /> */}
				<div className={s.actions}>
					<p>У вас есть аккаунт? <button onClick={() => { this.props.changeAuthFormPhase('login') }}>
						Войдите</button></p>	
				</div>
			</div>
		);
	}
}



export default Register;