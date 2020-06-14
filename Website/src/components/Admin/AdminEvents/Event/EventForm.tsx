import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import s from './Event.module.scss'
import { reduxForm, InjectedFormProps, SubmissionError, Field, initialize } from 'redux-form'
import { Input, Textarea, createField, createDropdown, Number, File } from '../../../Common/FormComponents/FormComponents'

import ActionButton from '../../../Common/ActionButton/ActionButton'
import { EventType } from '../../../../types/admin'
import Breadcrumbs from '../../../Common/Breadcrumbs/Breadcrumbs'

import { required, numberMask } from '../../../../utils/formValidation'

import contentHolder from '../../../../assets/img/content-img-holder.png'
import { apiURL } from '../../../../api/api'
import { loadImage } from '../../../../utils/loadImage'
import { sortDropdownValues } from '../../../../utils/sortDropdownValues'
import { MatchStatusEnum } from '../../../../types/matches'
import { getMatchStatus } from '../../../../utils/getValueFromEnumCode'
import { ShortDataElementType } from '../../../../types/types'

type FormType = {
	initialValues: any,
	onSubmitFunc: (formData: EventType) => void
	breadcrumbs: Array<{
		link: string
		text: string
	}>
	buttonText: string

	dropdownLists: {
		statuses: Array<ShortDataElementType>,
		championships: Array<ShortDataElementType>,
	}
}
type FormValuesType = {
	initialValues: EventType
	buttonText: string

	dropdownLists: {
		statuses: Array<ShortDataElementType>,
		championships: Array<ShortDataElementType>,
	}
}


const formName = 'admin-event-form'
const EventForm: FC<FormValuesType & InjectedFormProps<{}, FormValuesType>> = (props: any) => {
	const dispatch = useDispatch()

	let [isStatusSorted, setIsStatusSorted] = useState(false)
	let [isChampionshipsSorted, setIsChampionshipsSorted] = useState(false)
	let [statusArr, setStatusArr] = useState([])
	let [championshipsArr, setChampionshipsArr] = useState([])
	useEffect(() => {
		if (props.initialValues)
			sortDropdownValues(props.initialValues.role_id, statusArr, setStatusArr, setIsStatusSorted)
	}, [props.initialValues]);


	useEffect(() => {
		if (props.initialValues.id) {
			props.dropdownLists.statuses.length > 0 && sortDropdownValues(props.initialValues.status, props.dropdownLists.statuses, setStatusArr, setIsStatusSorted)
			props.dropdownLists.championships.length > 0 && sortDropdownValues(props.initialValues.championship_id, props.dropdownLists.championships, setChampionshipsArr, setIsChampionshipsSorted)
		} 
	}, [props.initialValues, props.dropdownLists.statuses, props.dropdownLists.championships]);







	return (
		<form onSubmit={props.handleSubmit}>
			{isStatusSorted && createDropdown('status', 'Статус', props.form, { elements: [...statusArr], valiadtors: [required] })}
			{isChampionshipsSorted && createDropdown('championship_id', 'Чемпионат', props.form, { elements: [...championshipsArr], valiadtors: [required] })}

			{createField("title", Input, "Название", { valiadtors: [required] })}
			{createField("start", Input, "Дата начала", { valiadtors: [required], placeholder: '2020-01-01 00:00:00' })}
			

			<div className={s.btnHolder}><ActionButton value={props.buttonText} /></div>
		</form>
	);
}
const ReduxEventForm = reduxForm<{}, FormValuesType>({ form: formName, enableReinitialize: true })(EventForm)


const EventFormBlock: FC<FormType> = ({ initialValues, onSubmitFunc, breadcrumbs = [], buttonText = "", ...props }) => {
	const dispatch = useDispatch()
	const handleSave = (formData: any) => {
		let dataObj = {
			title: formData.title,
			championship_id: formData.championship_id,
			status: formData.status,
			start: formData.start,
		} as EventType | any

		if (formData.id)
			dataObj.id = formData.id

		onSubmitFunc(dataObj)
	}
	return (
		<div>
			<Breadcrumbs pathParams={breadcrumbs} />
			<ReduxEventForm
				onSubmit={handleSave}
				initialValues={initialValues}
				buttonText={buttonText}
				dropdownLists={props.dropdownLists}
			/>
		</div>

	);
}



export default EventFormBlock;