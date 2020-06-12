import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { withRouter, RouteComponentProps, Redirect } from 'react-router'
import { AppStateType } from '../../../types/types'
import { ArticleType } from '../../../types/admin'
import SimpleForm from './SimpleForm'

import { changeTerms } from '../../../redux/admin-reducer'



const ArticleContainer = ({ ...props }) => {
	const terms = useSelector<AppStateType, string>(state => state.app.terms)
	const dispatch = useDispatch()

	const changeTermsDispatch = (text: string) => { 
		dispatch(changeTerms(text))
	}
	let initialValues = {
		title: '',
		content: ''
	}
	if (terms) {
		let title = ''
		let content = terms
		if (terms.includes('</h1>')) {
			let contentArr = terms.split('</h1>')
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
			formName="terms-form"
			initialValues={initialValues}
			onSubmitFunc={ changeTermsDispatch }
			breadcrumbs={[
				{ text: 'Главная', link: '/admin' },
				{ text: 'Terms and Conditions', link: '/admin/terms' }
			]}
		/>
	)
}

export default withRouter(ArticleContainer);