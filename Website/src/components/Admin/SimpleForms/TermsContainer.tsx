import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { withRouter, RouteComponentProps, Redirect } from 'react-router'
import { AppStateType } from '../../../types/types'
import { ArticleType } from '../../../types/admin'
import SimpleForm from './SimpleForm'

import { changeTerms } from '../../../redux/admin-reducer'



const ArticleContainer = ({ ...props }) => {
	// const policy = useSelector<AppStateType, string>(state => state.app.policy)
	const dispatch = useDispatch()
	let policy = ""

	const changeTermsDispatch = (text: string) => { 
		dispatch(changeTerms(text))
	}

	return (
		<SimpleForm
			formName="terms-form"
			initialValues={{ text: policy  }}
			onSubmitFunc={ changeTermsDispatch }
			breadcrumbs={[
				{ text: 'Главная', link: '/admin' },
				{ text: 'Terms and Conditions', link: '/admin/terms' }
			]}
		/>
	)
}

export default withRouter(ArticleContainer);