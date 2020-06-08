import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { Input, createField, File, Textarea } from '../../Common/FormComponents/FormComponents'

import ActionButton from '../../Common/ActionButton/ActionButton'

import { required } from '../../../utils/formValidation'
import { OptionsType } from './types'

type FormType = {
	initialValues: any,
	onSubmitFunc: (optionsObject: OptionsType) => void
}
type FormValuesType = {
	// title: string
	// content: string
}
	


const OptionsForm: FC<FormValuesType & InjectedFormProps<{}, FormValuesType>> = (props: any) => {
	return (
		<form onSubmit={props.handleSubmit}>

			 {createField('title', File, 'Favicon')}
			{createField('telegram', Input, 'Телеграм')}
			{createField('vkontakte', Input, 'Вконтакте')}
			{createField('twitter', Input, 'Твиттер')}
			{createField('instagram', Input, 'Инстаграм')}
			{createField('facebook', Input, 'Фейсбук')}

			{createField('ios-link', Input, 'Ссылка на мобильное приложение (IOS)')}
			{createField('android-link', Input, 'Ссылка на мобильное приложение (Android)')}
			
			{createField('copyright', Input, 'Копирайт')}
		

			{createField('main-page-notification', Textarea, 'Уведомление на главной')}
			{createField('show-forecast-comments', Input, 'Показать комментарии прогнозов', { type: 'checkbox' })}

			{createField('feedback-email', Input, 'Email для приема сообщений с формы обратной связи')}
			{createField('head-scripts', Textarea, 'Скрипты в head')}
			{createField('footer-scripts', Textarea, 'Скрипты в footer')} 

			<div><ActionButton value={"Подтвердить"} /></div>
		</form>
	);
}

const OptionsFormBlock: FC<FormType> = ({ initialValues, onSubmitFunc, ...props }) => {
	const dispatch = useDispatch()

	const handleSave = (formData: any) => {
		onSubmitFunc({})
	}

	

	return (
		<div>
			<ReduxForm initialValues={initialValues} onSubmit={handleSave} form={'options-form'}/>
		</div>

	);
}

const ReduxForm = reduxForm<{}, FormValuesType>({
	enableReinitialize: true
})(OptionsForm)

export default OptionsFormBlock;