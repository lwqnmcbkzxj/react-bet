import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from './Article.module.scss'
import { reduxForm, InjectedFormProps, SubmissionError, Field, change } from 'redux-form'
import { Input, Textarea, createField, File, FormatTextarea } from '../../../Common/FormComponents/FormComponents'

import ActionButton from '../../../Common/ActionButton/ActionButton'
import { ArticleType } from '../../../../types/admin'
import Breadcrumbs from '../../../Common/Breadcrumbs/Breadcrumbs'

import { required } from '../../../../utils/formValidation'

import Loader from '../../../Common/Preloader/Preloader'
import contentHolder from '../../../../assets/img/content-img-holder.png'
import { apiURL } from '../../../../api/api'
import { loadImage } from '../../../../utils/loadImage'
import { AppStateType } from '../../../../types/types'

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
	buttonText: string
}
	
const ArticleForm: FC<FormValuesType & InjectedFormProps<{}, FormValuesType>> = (props: any) => {
	const isFetchingArray = useSelector<AppStateType, Array<string>>(state => state.admin.isFetchingArray)
	const dispatch = useDispatch()
	const setPreviewImage = (file: File) => {
		loadImage(file, props.formName, 'image', 'admin-article-img-holder', dispatch)
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

			<div className={s.btnHolder}>
				{isFetchingArray.includes('article-action') ?
					<Loader /> :
					<ActionButton value={props.buttonText} />
				}
			</div>
		</form>
	);
}
const ReduxArticleForm = reduxForm<{}, FormValuesType>({ form: 'article-form', enableReinitialize: true  })(ArticleForm)


const ArticleFormBlock: FC<FormType> = ({ initialValues, onSubmitFunc, breadcrumbs = [], buttonText = "", ...props }) => {
	const dispatch = useDispatch()
	const handleSave = (formData: any) => {
		let dataObject = {} as ArticleType

		if (formData.id) dataObject.id = formData.id
		dataObject = {
			title: formData.title,
			category_name: formData.category_name,
			content: formData.content,
			image: formData.image,
			is_published: +formData.is_published
		}

		onSubmitFunc({...dataObject })
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