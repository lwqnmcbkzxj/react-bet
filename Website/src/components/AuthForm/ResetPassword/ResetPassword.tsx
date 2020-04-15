import React from 'react';
import s from '../AuthForm.module.css';
import { Redirect } from 'react-router';

import { reduxForm } from 'redux-form';
import { Input, createField } from '../../Common/FormComponents/FormComponents';
// import LoginThrough from './LoginThrough/LoginThrough'

const RegisterForm = (props: any) => {
	return (
		<div className={s.resetPasswordForm}>
			<form onSubmit={props.handleSubmit}>
				<div className={s.formError}>{props.error}</div>
				<h1>Восстановление пароля</h1>

				{createField("email", Input, "Ваша почта или никнейм" )  }
				
				
				<div className={s.btnHolder}><button className={s.submitBtn}>Восстановить</button></div>
			</form>
		</div>
	);
}
const ReduxPasswordResetForm = reduxForm({ form: 'reset-password' })(RegisterForm)

type AuthFormPropsType = {
	changeAuthFormPhase: (phase: string) => void
}

class PasswordReset extends React.Component<AuthFormPropsType> {
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
				<ReduxPasswordResetForm onSubmit={() => console.log('s')} />

				<div className={s.orLine}><p>или</p></div>
				
				{/* <LoginThrough /> */}
			</div>
		);
	}
}



export default PasswordReset;