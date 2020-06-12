import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import s from './Bookmaker.module.scss'
import { reduxForm, InjectedFormProps, SubmissionError, Field } from 'redux-form'
import { Input, Textarea, createField, File, FormatTextarea } from '../../../Common/FormComponents/FormComponents'

import ActionButton from '../../../Common/ActionButton/ActionButton'
import { BookmakerType } from '../../../../types/admin'
import Breadcrumbs from '../../../Common/Breadcrumbs/Breadcrumbs'

import { required } from '../../../../utils/formValidation'
import { Redirect } from 'react-router'
import { Editor } from '@tinymce/tinymce-react';

import contentHolder from '../../../../assets/img/content-img-holder.png'
import { apiURL } from '../../../../api/api'
import { loadImage } from '../../../../utils/loadImage'

type FormType = {
	initialValues: any,
	onSubmitFunc: (formData: BookmakerType) => void
	breadcrumbs: Array<{
		link: string
		text: string
	}>
	buttonText: string
}
type FormValuesType = {
	initialValues: BookmakerType
	buttonText: string
}



const BookmakerForm: FC<FormValuesType & InjectedFormProps<{}, FormValuesType>> = (props: any) => {
	const dispatch = useDispatch()
	const setPreviewImage = (file: File) => {
		loadImage(file, props.formName, 'image', 'admin-bookmaker-logo', dispatch)
	}

	return (
		<form onSubmit={props.handleSubmit}>

			{createField("title", Input, "Название букмекера", { valiadtors: [required] })}
			{createField("content", FormatTextarea, "Описание букмекера")}

			{createField("image", File, "Изображение", { formName: 'bookmaker-form', onChangeFunc: setPreviewImage })}

			<div className={s.previewImg}>
				<img src={props.initialValues.image ? apiURL + props.initialValues.image : contentHolder} alt="bookmaker-img" id="admin-bookmaker-logo" />
			</div>
			{createField("rating", Input, "Рейтинг")}
			{createField("bonus", Input, "Бонус")}

			{createField("link", Input, "Ссылка")}

			{createField("meta_title", Input, "Мета-заголовок", {})}
			{createField("meta_description", Input, "Мета-описание", {})}
			{createField("meta_key_words", Input, "Мета-ключевые слова", {})}

			{createField("no_index", Input, "Не индексировать", { type: 'checkbox' })}

			<div className={s.btnHolder}><ActionButton value={props.buttonText} /></div>
		</form>
	);
}
const ReduxForm = reduxForm<{}, FormValuesType>({ form: 'bookmaker-form', enableReinitialize: true })(BookmakerForm)


const BookmakerFormBlock: FC<FormType> = ({ initialValues, onSubmitFunc, breadcrumbs = [], buttonText = "", ...props }) => {
	console.log(initialValues)
	const dispatch = useDispatch()
	const handleSave = (formData: BookmakerType | any) => {
		let dataObj = {} as BookmakerType | any
		for (let key in formData) {
			if (key === 'image') {
				if (formData.image !== initialValues.image)
					dataObj[key] = formData[key]
			} else {
				dataObj[key] = formData[key]
			}
		}


		onSubmitFunc(dataObj)
	}

	return (
		<div>
			<Breadcrumbs pathParams={breadcrumbs} />
			<ReduxForm
				onSubmit={handleSave}
				initialValues={initialValues}
				buttonText={buttonText}
			/>
		</div>

	);
}



export default BookmakerFormBlock;