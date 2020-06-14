import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import s from './Championship.module.scss'
import { reduxForm, InjectedFormProps, SubmissionError, Field, initialize } from 'redux-form'
import { Input, Textarea, createField, createDropdown, Number, File } from '../../../Common/FormComponents/FormComponents'

import ActionButton from '../../../Common/ActionButton/ActionButton'
import { ChampionshipType } from '../../../../types/admin'
import Breadcrumbs from '../../../Common/Breadcrumbs/Breadcrumbs'

import { required, numberMask } from '../../../../utils/formValidation'

import { sortDropdownValues } from '../../../../utils/sortDropdownValues'
import { SportType, ShortDataElementType } from '../../../../types/types'

type FormType = {
	initialValues: any,
	onSubmitFunc: (formData: ChampionshipType) => void
	breadcrumbs: Array<{
		link: string
		text: string
	}>
	buttonText: string

	dropdownLists: {
		sports: Array<ShortDataElementType>
	}
}
type FormValuesType = {
	initialValues: ChampionshipType
	buttonText: string

	dropdownLists: {
		sports: Array<ShortDataElementType>
	}
}


const formName = 'admin-championship-form'
const ChampionshipForm: FC<FormValuesType & InjectedFormProps<{}, FormValuesType>> = (props: any) => {
	const dispatch = useDispatch()
	let [isSportsSorted, setIsSportsSorted] = useState(false)
	let [sportsArray, setSportsArray] = useState([])


	useEffect(() => {
		if (props.initialValues.id) {
			props.dropdownLists.sports.length > 0 && sortDropdownValues(props.initialValues.sport_id, props.dropdownLists.sports, setSportsArray, setIsSportsSorted)
		} 
	}, [props.initialValues, props.dropdownLists]);



	return (
		<form onSubmit={props.handleSubmit}>
			{isSportsSorted && createDropdown('sport_id', 'Вид спорта', props.form, { elements: [...sportsArray], })}

			{createField("name", Input, "Название", { valiadtors: [required] })}
			

			<div className={s.btnHolder}><ActionButton value={props.buttonText} /></div>
		</form>
	);
}
const ReduxChampionshipForm = reduxForm<{}, FormValuesType>({ form: formName, enableReinitialize: true })(ChampionshipForm)


const ChampionshipFormBlock: FC<FormType> = ({ initialValues, onSubmitFunc, breadcrumbs = [], buttonText = "", ...props }) => {
	const dispatch = useDispatch()
	const handleSave = (formData: any) => {
		let dataObj = {
			name: formData.name,
			sport_id: formData.sport_id
		} as ChampionshipType | any

		if (formData.id)
			dataObj.id = formData.id

		onSubmitFunc(dataObj)
	}
	return (
		<div>
			<Breadcrumbs pathParams={breadcrumbs} />
			<ReduxChampionshipForm
				onSubmit={handleSave}
				initialValues={initialValues}
				buttonText={buttonText}
				dropdownLists={props.dropdownLists}
			/>
		</div>

	);
}



export default ChampionshipFormBlock;