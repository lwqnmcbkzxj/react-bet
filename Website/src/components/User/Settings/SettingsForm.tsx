import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import s from './Settings.module.scss'
import { reduxForm, InjectedFormProps, SubmissionError } from 'redux-form'
import { Input, createField } from '../../Common/FormComponents/FormComponents'

import ActionButton from '../../Common/ActionButton/ActionButton'
import { emailRegExp } from '../../../types/types'

import { changePassword, changeEmail, changeUserPhoto } from '../../../redux/me-reducer'

type SettingsFormType = {
	initialValues: any
}
type SettingsFormValuesType = {
	email: string
	password: string
	password_repeat: string
	file: File
}

const SettingsForm: FC<InjectedFormProps<SettingsFormValuesType>> = (props: any) => {
	return (
		<form onSubmit={props.handleSubmit} className={s.settingsForm}>
			<div className={s.formBlock}>
				<div className={s.settingBlockHeader}>Персональные данные</div>
				{createField("email", Input, "E-mail")}
			</div>
{/* 
			<div className={s.formBlock}>
				<div className={s.settingBlockHeader}>Связанные аккаунты</div>
			</div> */}

			<div className={s.formBlock}>
				<div className={s.settingBlockHeader}>Изменить пароль</div>
				<div className={s.inputs}>
					{createField("password", Input, "Новый пароль", { type: "password", placeholder: "***********" })}
					{createField("password_repeat", Input, "Повторите пароль", { type: "password", placeholder: "***********" })}
				</div>
			</div>

			<div className={s.btnHolder}><ActionButton value="Сохранить изменения"/></div>
		</form>
	);
}
const ReduxSettingsForm = reduxForm<SettingsFormValuesType>({ form: 'profile-form' })(SettingsForm)


const SettingsFormBlock: FC<SettingsFormType> = ({ initialValues, ...props }) => {
	const dispatch = useDispatch()
	const handleSave = (formData: SettingsFormValuesType) => {
		if (checkEmail(formData.email)) {
			dispatch(changeEmail(formData.email))
		} 
		if (checkPassword(formData.password) && formData.password === formData.password_repeat) {
			dispatch(changePassword(formData.password))
		} 
		if (formData.file) {
			dispatch(changeUserPhoto(formData.file))
		}

	}
	const checkEmail = (email: string) => {
		if (email && email !== initialValues.email) {
			if (email.match(emailRegExp)) {
				return true
			}
		}
		return false
	}
	const checkPassword = (password: string) => {
		if (password && password.length >= 8) {
				return true
		} else 
			return false
	}
	return (
		<ReduxSettingsForm onSubmit={handleSave} initialValues={initialValues} />
	);
}



export default SettingsFormBlock;