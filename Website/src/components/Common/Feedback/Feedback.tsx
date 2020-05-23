import React, { FC, useEffect } from 'react'
import './Feedback.scss'
import classNames from 'classnames'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import { reduxForm, InjectedFormProps, SubmissionError, change } from 'redux-form'
import { createField, Input, Textarea } from '../FormComponents/FormComponents'
import ActionButton from '../ActionButton/ActionButton'
import { useDispatch } from 'react-redux'
import { sendEmail } from '../../../redux/app-reducer'
import { emailRegExp } from '../../../types/types'

type FeedbackFormValuesType = {
	email: string
	text: string
}


const Feedback = ({ ...props }) => {
	const dispatch = useDispatch()
	const handleSend = (formData: FeedbackFormValuesType) => {
		if (!formData.email || !formData.text) {
			throw new SubmissionError({ _error: 'Заполните все поля' })
		} else if (!formData.email.match(emailRegExp))
			throw new SubmissionError({ _error: 'Введен некорректный email' })
		else {
			dispatch(sendEmail(formData.email, formData.text))
			dispatch(change('feedback', 'email', ''))
			dispatch(change('feedback', 'text', ''))
			throw new SubmissionError({ _error: 'Письмо отправлено' })
		}
	}
	return (
		<div>

			<Breadcrumbs pathParams={[
				{ text: 'Главная', link: '' },
				{ text: 'Обратная связь', link: '/feedback' },]} />

			<ReduxFeedbackForm onSubmit={handleSend} />
		</div>
	)
}


const FeedbackForm: FC<InjectedFormProps<FeedbackFormValuesType>> = (props: any) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div className={classNames("feedback__error", { ["feedback__error_active"]: props.error })}>{props.error}</div>

			{createField("email", Input, "", { placeholder: 'Email' })}
			{createField("text", Textarea, "", { placeholder: 'Ваши пожелания и предложения', type: 'textarea' })}

			<div className="feedback__button"><ActionButton value="Отправить" /></div>
		</form>
	);
}
const ReduxFeedbackForm = reduxForm<FeedbackFormValuesType>({ form: 'feedback' })(FeedbackForm)



export default Feedback