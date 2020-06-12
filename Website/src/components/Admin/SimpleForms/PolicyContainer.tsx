import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { withRouter, RouteComponentProps, Redirect } from 'react-router'
import { AppStateType } from '../../../types/types'
import { ArticleType } from '../../../types/admin'
import SimpleForm from './SimpleForm'

import { changePolicy } from '../../../redux/admin-reducer'



const ArticleContainer = ({ ...props }) => {
	const dispatch = useDispatch()
	let policy = useSelector<AppStateType, string>(state => state.app.policy)

	const changePolicyDispatch = (text: string) => {
		dispatch(changePolicy(text))
	}

	let initialValues = {
		title: '',
		content: ''
	}
	if (policy) {
		let title = ''
		let content = policy
		if (policy.includes('</h1>')) {
			let contentArr = policy.split('</h1>')
			title = contentArr[0].split(/<h1>|<\/h1>/)[1]
			content = contentArr[1]
		}
		initialValues = {
			title,
			content
		}
	}

	return (
		<SimpleForm
			formName="policy-form"
			initialValues={initialValues}
			onSubmitFunc={changePolicyDispatch}
			breadcrumbs={[
				{ text: 'Главная', link: '/admin' },
				{ text: 'Политика конфиденциальности', link: '/admin/policy' }
			]}
		/>
	)
}

export default withRouter(ArticleContainer);