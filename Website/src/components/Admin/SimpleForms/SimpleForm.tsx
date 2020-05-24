import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { reduxForm, InjectedFormProps, SubmissionError, Field } from 'redux-form'
import { Input, Textarea, createField, File } from '../../Common/FormComponents/FormComponents'

import ActionButton from '../../Common/ActionButton/ActionButton'
import Breadcrumbs from '../../Common/Breadcrumbs/Breadcrumbs'

import { required } from '../../../utils/formValidation'
import { Redirect } from 'react-router'

type FormType = {
	initialValues: any,
	onSubmitFunc: (formData: any) => void
	breadcrumbs: Array<{
		link: string
		text: string
	}>
	formName: string
}
type FormValuesType = {
	
}
	


const SimpleForm: FC<FormValuesType & InjectedFormProps<{}, FormValuesType>> = (props: any) => {
	return (
		<form onSubmit={props.handleSubmit}>

			{createField('content', Textarea, 'Содержание', { valiadtors: [required] })}


			<div><ActionButton value={"Подтвердить"} /></div>
		</form>
	);
}

const SimpleFormBlock: FC<FormType> = ({ initialValues, breadcrumbs = [], onSubmitFunc, formName, ...props }) => {
	const dispatch = useDispatch()
	const handleSave = (formData: any) => {
		onSubmitFunc(formData)
		
	}

	const ReduxForm = reduxForm<{}, FormValuesType>({
		form: formName,
	})(SimpleForm)

	return (
		<div>
			<Breadcrumbs pathParams={breadcrumbs} />
		
			<ReduxForm initialValues={{}} onSubmit={handleSave}/>
		</div>

	);
}



export default SimpleFormBlock;