import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { Input, createField, FormatTextarea, Textarea } from '../../Common/FormComponents/FormComponents'

import ActionButton from '../../Common/ActionButton/ActionButton'
import Breadcrumbs from '../../Common/Breadcrumbs/Breadcrumbs'

import { required } from '../../../utils/formValidation'

type FormType = {
	initialValues: any,
	onSubmitFunc: (formData: string) => void
	breadcrumbs: Array<{
		link: string
		text: string
	}>
	formName: string
}
type FormValuesType = {
	// title: string
	// content: string
}
	


const SimpleForm: FC<FormValuesType & InjectedFormProps<{}, FormValuesType>> = (props: any) => {
	console.log(props.initialValues.content)
	return (
		<form onSubmit={props.handleSubmit}>

			{createField('title', Input, 'Название', { valiadtors: [required] })}
			{createField('content', FormatTextarea, 'Содержание', { valiadtors: [required] })}
			{/* {createField('content', Textarea, 'Содержание', { valiadtors: [required] })} */}


			<div><ActionButton value={"Подтвердить"} /></div>
		</form>
	);
}

const SimpleFormBlock: FC<FormType> = ({ initialValues, breadcrumbs = [], onSubmitFunc, formName, ...props }) => {
	const dispatch = useDispatch()
	const handleSave = (formData: any) => {
		let title = `<h1>${formData.title}</h1>`
		onSubmitFunc(title + formData.content)
		
	}

	

	return (
		<div>
			<Breadcrumbs pathParams={breadcrumbs} />
		
			<ReduxForm initialValues={initialValues} onSubmit={handleSave} form={formName}/>
		</div>

	);
}

const ReduxForm = reduxForm<{}, FormValuesType>({
	enableReinitialize: true
})(SimpleForm)

export default SimpleFormBlock;