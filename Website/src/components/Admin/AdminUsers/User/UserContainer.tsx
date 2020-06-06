import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { withRouter, RouteComponentProps, Redirect } from 'react-router'
import { AppStateType } from '../../../../types/types'
import { UserType } from '../../../../types/admin'
import UserForm from './UserForm'

import { getAdminUserFromServer, addUser, editUser } from '../../../../redux/admin-reducer'

import moment from 'moment'
import { formatDateSimply } from '../../../../utils/formatDate'

interface MatchParams {
	userId: string;
}





interface ArticleProps extends RouteComponentProps<MatchParams> { }

const ArticleContainer: FC<ArticleProps> = ({ ...props }) => {
	const user = useSelector<AppStateType, UserType>(state => state.admin.users.currentUser)
	const dispatch = useDispatch()

	let userId = props.match.params.userId;
	useEffect(() => {
		if (userId) {
			dispatch(getAdminUserFromServer(+userId))
		}
	}, []);


	const addUserDispatch = async (formData: UserType) => {
		await dispatch(addUser(formData))

		props.history.push('/admin/users');
	}
	const editUserDispatch = async (formData: UserType) => {
		await dispatch(editUser(+userId, formData))

		props.history.push('/admin/users');
	}


	let initialValues = {} as any
	let onSubmitFunc
	let breadcrumbsObj
	let buttonText = ""
	if (userId) {
		initialValues = {...user}
		initialValues.created_at = formatDateSimply(initialValues.created_at)
		onSubmitFunc = editUserDispatch
		breadcrumbsObj = { text: 'Изменение пользователя', link: `/admin/users/${userId}/edit` }
		buttonText = "Изменить пользователя"
	} else {
		onSubmitFunc = addUserDispatch

		initialValues = {
			login: '',
			email: '',
			balance: '',
			platform: '',
			created_at: '',
			uid: 0
		}
		breadcrumbsObj = { text: 'Добавление пользователя', link: '/admin/users/add' }
		buttonText = "Добавить пользователя"
	}
	

	
	
	return (
		<UserForm
			initialValues={initialValues}
			onSubmitFunc={onSubmitFunc}
			breadcrumbs={[
				{ text: 'Главная', link: '/admin' },
				{ text: 'Пользователи', link: '/admin/users' },
				{ ...breadcrumbsObj }
			]}
			buttonText={buttonText}
		/>
	)
}

export default withRouter(ArticleContainer);