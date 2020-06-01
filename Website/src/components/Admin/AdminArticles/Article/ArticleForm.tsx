import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import s from './Article.module.scss'
import { reduxForm, InjectedFormProps, SubmissionError, Field } from 'redux-form'
import { Input, Textarea, createField, File, FormatTextarea } from '../../../Common/FormComponents/FormComponents'

import ActionButton from '../../../Common/ActionButton/ActionButton'
import { ArticleType } from '../../../../types/admin'
import Breadcrumbs from '../../../Common/Breadcrumbs/Breadcrumbs'

import { required } from '../../../../utils/formValidation'
import { Redirect } from 'react-router'
import { Editor } from '@tinymce/tinymce-react';

type FormType = {
	initialValues: any,
	onSubmitFunc: (formData: ArticleType) => void
	breadcrumbs: Array<{
		link: string
		text: string
	}>
	buttonText: string
}
type FormValuesType = {
	initialValues: ArticleType
	buttonText: string
}
	


const ArticleForm: FC<FormValuesType & InjectedFormProps<{}, FormValuesType>> = (props: any) => {
	return (
		<form onSubmit={props.handleSubmit} className={s.settingsForm}>

			{createField("title", Input, "Название статьи", { valiadtors: [required] })}
			{createField("category_name", Input, "Название категории", { valiadtors: [required] })}

			{createField("content", FormatTextarea, "Описание статьи", { valiadtors: [required] })}
			{/* {createField("content", Textarea, "Описание статьи", { valiadtors: [required] })} */}

			
			{/* {<FormatTextarea formName="article-form" name="content" /> } */}
			
			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
				{createField("is_published", Input, "Опубликована", { type: 'checkbox' })}

				{/* {createField("image", File, "", { formName: 'article-form' })} */}
			</div>
			<div className={s.btnHolder}><ActionButton value={props.buttonText} /></div>
		</form>
	);
}
const ReduxArticleForm = reduxForm<{}, FormValuesType>({ form: 'article-form', enableReinitialize: true  })(ArticleForm)


const ArticleFormBlock: FC<FormType> = ({ initialValues, onSubmitFunc, breadcrumbs = [], buttonText = "", ...props }) => {
	console.log(initialValues)
	const dispatch = useDispatch()
	const handleSave = (formData: ArticleType) => {
		onSubmitFunc(formData)
		
	}

	return (
		<div>
			<Breadcrumbs pathParams={breadcrumbs} />
			<ReduxArticleForm
				onSubmit={handleSave}
				initialValues={initialValues}
				buttonText={buttonText}
			/>
		</div>

	);
}



export default ArticleFormBlock;