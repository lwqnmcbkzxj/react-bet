import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import s from './Forecast.module.scss'
import { reduxForm, InjectedFormProps, SubmissionError, Field } from 'redux-form'
import { Input, Textarea, createField, File, FormatTextarea } from '../../../Common/FormComponents/FormComponents'

import ActionButton from '../../../Common/ActionButton/ActionButton'
import { ArticleType } from '../../../../types/admin'
import Breadcrumbs from '../../../Common/Breadcrumbs/Breadcrumbs'

import { required } from '../../../../utils/formValidation'
import { Redirect } from 'react-router'
import { Editor } from '@tinymce/tinymce-react';

import contentHolder from '../../../../assets/img/content-img-holder.png'
import { apiURL } from '../../../../api/api'

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
	const setPreviewImage = (file: File) => {
		let fileReader = new FileReader()
		fileReader.onload = function (event: any) {
			document.getElementById('admin-article-img-holder')?.setAttribute("src", event.target.result)
		}

		fileReader.readAsDataURL(file)
	}


	return (
		<form onSubmit={props.handleSubmit}>

			{createField("title", Input, "Название статьи", { valiadtors: [required] })}
			{createField("category_name", Input, "Название категории", { valiadtors: [required] })}

			{createField("content", FormatTextarea, "Описание статьи", { valiadtors: [required] })}
			
			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
				{createField("image", File, "Превью", { formName: 'article-form', onChangeFunc: setPreviewImage })}
			</div>

			<div className={s.previewImg}>
				<img src={props.initialValues.image ? apiURL + props.initialValues.image : contentHolder} alt="article-img" id="admin-article-img-holder"/>
			</div>

			{createField("meta_title", Input, "Мета-заголовок", {  })}
			{createField("meta_description", Input, "Мета-описание", {  })}
			{createField("meta_key_words", Input, "Мета-ключевые слова", {  })}
			{createField("meta_title", Input, "Мета-заголовок", {  })}
			{createField("is_published", Input, "Опубликована", { type: 'checkbox' })}
			{createField("no_index", Input, "Не индексировать", { type: 'checkbox' })}

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