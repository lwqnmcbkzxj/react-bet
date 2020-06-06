import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import s from './User.module.scss'
import { reduxForm, InjectedFormProps, SubmissionError, Field } from 'redux-form'
import { Input, Textarea, createField, createDropdown, Number, File } from '../../../Common/FormComponents/FormComponents'

import ActionButton from '../../../Common/ActionButton/ActionButton'
import { UserType } from '../../../../types/admin'
import Breadcrumbs from '../../../Common/Breadcrumbs/Breadcrumbs'

import { required, numberMask } from '../../../../utils/formValidation'

import contentHolder from '../../../../assets/img/content-img-holder.png'
import { apiURL } from '../../../../api/api'

type FormType = {
	initialValues: any,
	onSubmitFunc: (formData: UserType) => void
	breadcrumbs: Array<{
		link: string
		text: string
	}>
	buttonText: string
}
type FormValuesType = {
	initialValues: UserType
	buttonText: string
}



const UserForm: FC<FormValuesType & InjectedFormProps<{}, FormValuesType>> = (props: any) => {
	return (
		<form onSubmit={props.handleSubmit}>
			{createDropdown('role_id', 'Роль', { elements: ['Пользователь','Робот-прогнозист','Модератор','Администратор',] })}

			{createField("login", Input, "Логин", { valiadtors: [required] })}
			{createField("email", Input, "E-mail", { valiadtors: [required] })}

			{createField("balance", Input, "Баланс", { valiadtors: [required] })}
			
			{createField("platform", Input, "Платформа", {})}
			{!props.initialValues.id && createField("uid", Input, "UID (системное поле для парсинга)", { mask: numberMask })}
			

			{props.initialValues.id && createField("created_at", Input, "Дата регистрации", { disabled: true })}
			{createField("avatar", File, "Аватарка" )}


			<div className={s.btnHolder}><ActionButton value={props.buttonText} /></div>
		</form>
	);
}
const ReduxUserForm = reduxForm<{}, FormValuesType>({ form: 'user-form', enableReinitialize: true  })(UserForm)


const UserFormBlock: FC<FormType> = ({ initialValues, onSubmitFunc, breadcrumbs = [], buttonText = "", ...props }) => {
	console.log(initialValues)
	const dispatch = useDispatch()
	const handleSave = (formData: any) => {
		onSubmitFunc(formData)
		
	}

	return (
		<div>
			<Breadcrumbs pathParams={breadcrumbs} />
			<ReduxUserForm
				onSubmit={handleSave}
				initialValues={initialValues}
				buttonText={buttonText}
			/>
		</div>

	);
}



export default UserFormBlock;