import React, { FC, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import s from './Forecast.module.scss'
import { reduxForm, InjectedFormProps, SubmissionError, Field } from 'redux-form'
import { Input, Textarea, createField, File, FormatTextarea, createDropdown } from '../../../Common/FormComponents/FormComponents'

import ActionButton from '../../../Common/ActionButton/ActionButton'
import { ForecastType } from '../../../../types/admin'
import Breadcrumbs from '../../../Common/Breadcrumbs/Breadcrumbs'

import { required, number } from '../../../../utils/formValidation'
import { ForecastStatusEnum } from '../../../../types/forecasts'
import { sortDropdownValues } from '../../../../utils/sortDropdownValues'
import { ShortDataElementType } from '../../../../types/types'

type FormType = {
	initialValues: any,
	onSubmitFunc: (formData: ForecastType) => void
	breadcrumbs: Array<{
		link: string
		text: string
	}>
	buttonText: string

	dropdownLists: {
		users: Array<ShortDataElementType>
		events: Array<ShortDataElementType>
	}
}
type FormValuesType = {
	initialValues: ForecastType
	buttonText: string
	dropdownLists: {
		users: Array<ShortDataElementType>
		events: Array<ShortDataElementType>
	}
}
	

const formName = 'admin-forecast-form'
const ForecastForm: FC<FormValuesType & InjectedFormProps<{}, FormValuesType>> = (props: any) => {
	let [isStatusSorted, setIsStatusSorted] = useState(false)
	let [isUsersSorted, setIsUsersSorted] = useState(false)
	let [isEventsSorted, setIsEventsSorted] = useState(false)

	let [statusArr, setStatusArr] = useState([
		{ id: ForecastStatusEnum.back, value: 'Возврат ставки' },
		{ id: ForecastStatusEnum.wait, value: 'Ставка еще не сыграла' },
		{ id: ForecastStatusEnum.win, value: 'Ставка прошла' },
		{ id: ForecastStatusEnum.loss, value: 'Ставка не прошла' },
	])
	let [usersArr, setUsersArr] = useState([])
	let [eventsArr, setEventsArr] = useState([])
	
	useEffect(() => {
		if (props.initialValues) {
			sortDropdownValues(props.initialValues.status, statusArr, setStatusArr, setIsStatusSorted)

			props.dropdownLists.users.length > 0 && sortDropdownValues(props.initialValues.user_id, props.dropdownLists.users, setUsersArr, setIsUsersSorted)
			props.dropdownLists.events.length > 0 && sortDropdownValues(props.initialValues.event_id, props.dropdownLists.events, setEventsArr, setIsEventsSorted)
		} else {
			setEventsArr(props.dropdownLists.events)
			setUsersArr(props.dropdownLists.users)
			setIsUsersSorted(true)
			setIsEventsSorted(true)
		}
	}, [props.initialValues, props.dropdownLists.events, props.dropdownLists.users]);

	return (
		<form onSubmit={props.handleSubmit}>

			{isStatusSorted && createDropdown("status", "Статус", props.form, { elements: [...statusArr] })}

			{isUsersSorted && createDropdown("user_id", "Прогноз от", props.form, { elements: [...usersArr] })}
			{isEventsSorted && createDropdown("event_id", "Событие", props.form, { elements: [...eventsArr] })}

			{createField("forecast_text", Textarea, "Содержание", { valiadtors: [required] })}
			{createField("bet", Input, "Ставка", { valiadtors: [required, number] })}
			{createField("type", Input, "Исход", { valiadtors: [required] })}
			{createField("coefficient", Input, "Коэффициент", { valiadtors: [required] })}


			<div>
				
			</div>

			<div className={s.btnHolder}><ActionButton value={props.buttonText} /></div>
		</form>
	);
}
const ReduxForecastForm = reduxForm<{}, FormValuesType>({ form: formName, enableReinitialize: true  })(ForecastForm)


const ForecastFormBlock: FC<FormType> = ({ initialValues, onSubmitFunc, breadcrumbs = [], buttonText = "", ...props }) => {
	console.log(initialValues)
	const dispatch = useDispatch()
	const handleSave = (formData: ForecastType | any) => {
		onSubmitFunc(formData)
	}

	let initialData = initialValues.id && {
		user_id: initialValues.user_data.id,
		event_id: initialValues.event_data.event_id,
		type: initialValues.bet_data.type,
		coefficient: initialValues.bet_data.coefficient,
		bet: initialValues.bet_data.bet,
		forecast_text: initialValues.forecast_text,
		status: initialValues.bet_data.status,
	} as ForecastType | any


	return (
		<div>
			<Breadcrumbs pathParams={breadcrumbs} />
			<ReduxForecastForm
				onSubmit={handleSave}
				initialValues={initialData}
				buttonText={buttonText}
				dropdownLists={props.dropdownLists}
			/>
		</div>

	);
}



export default ForecastFormBlock;