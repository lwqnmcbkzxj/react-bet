import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import s from './User.module.scss'
import { reduxForm, InjectedFormProps, SubmissionError, Field, initialize } from 'redux-form'
import { Input, Textarea, createField, createDropdown, Number, File } from '../../../Common/FormComponents/FormComponents'

import ActionButton from '../../../Common/ActionButton/ActionButton'
import { UserType } from '../../../../types/admin'
import Breadcrumbs from '../../../Common/Breadcrumbs/Breadcrumbs'

import { required, numberMask } from '../../../../utils/formValidation'

import contentHolder from '../../../../assets/img/content-img-holder.png'
import { apiURL } from '../../../../api/api'
import { loadImage } from '../../../../utils/loadImage'
import { sortDropdownValues } from '../../../../utils/sortDropdownValues'

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


const formName = 'admin-user-form'
const UserForm: FC<FormValuesType & InjectedFormProps<{}, FormValuesType>> = (props: any) => {
	const dispatch = useDispatch()
	const setAvatar = (file: File) => {
		loadImage(file, props.formName, 'image', 'admin-user-logo', dispatch)
	}

	let [isSortedRoles, setIsRolesSorted] = useState(false)
	let [rolesArray, setRolesArray] = useState([
		{ id: 1, value: 'Пользователь' },
		{ id: 2, value: 'Робот-прогнозист' },
		{ id: 3, value: 'Модератор' },
		{ id: 4, value: 'Администратор' },
		{ id: 5, value: 'Технический администратор' },
	])
	useEffect(() => {
		if (props.initialValues)
			sortDropdownValues(props.initialValues.role_id, rolesArray, setRolesArray, setIsRolesSorted)
	}, [props.initialValues]);


	return (
		<form onSubmit={props.handleSubmit}>
			{isSortedRoles && createDropdown('role_id', 'Роль', props.form, { elements: [...rolesArray], })}

			{createField("login", Input, "Логин", { valiadtors: [required] })}
			{createField("email", Input, "E-mail", { valiadtors: [required] })}

			{createField("balance", Input, "Баланс", { valiadtors: [required] })}

			{createField("platform", Input, "Платформа", {})}
			{!props.initialValues.id && createField("uid", Input, "UID (системное поле для парсинга)", { mask: numberMask })}


			{props.initialValues.id && createField("created_at", Input, "Дата регистрации", { disabled: true })}

			{createField("avatar", File, "Аватарка", { formName: props.form, onChangeFunc: setAvatar })}
			<div className={s.avatar}>
				<img src={props.initialValues.avatar ? apiURL + props.initialValues.avatar : contentHolder} alt="user-img" id="admin-user-logo" />
			</div>

			<div className={s.btnHolder}><ActionButton value={props.buttonText} /></div>
		</form>
	);
}
const ReduxUserForm = reduxForm<{}, FormValuesType>({ form: formName, enableReinitialize: true })(UserForm)


const UserFormBlock: FC<FormType> = ({ initialValues, onSubmitFunc, breadcrumbs = [], buttonText = "", ...props }) => {
	const dispatch = useDispatch()
	const handleSave = (formData: any) => {
		let dataObj = {} as UserType | any

		for (let key in formData) {
			if (key === 'avatar') {
				if (formData.avatar !== initialValues.avatar)
					dataObj[key] = formData[key]
			} else if (key !== 'uid') {
				dataObj[key] = formData[key]
			}
		}

		onSubmitFunc(dataObj)
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