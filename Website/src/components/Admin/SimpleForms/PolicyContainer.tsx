import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { withRouter, RouteComponentProps, Redirect } from 'react-router'
import { AppStateType } from '../../../types/types'
import { ArticleType } from '../../../types/admin'
import SimpleForm from './SimpleForm'

import { changePolicy } from '../../../redux/admin-reducer'



const ArticleContainer = ({ ...props }) => {
	// const policy = useSelector<AppStateType, string>(state => state.app.policy)
	const dispatch = useDispatch()
	let policy = ""

	const changePolicyDispatch = (text: string) => { 
		dispatch(changePolicy(text))
	}

	return (
		<SimpleForm
			formName="policy-form"
			initialValues={{ text: policy  }}
			onSubmitFunc={ changePolicyDispatch }
			breadcrumbs={[
				{ text: 'Главная', link: '/admin' },
				{ text: 'Политика конфиденциальности', link: '/admin/policy' }
			]}
		/>
	)
}

export default withRouter(ArticleContainer);