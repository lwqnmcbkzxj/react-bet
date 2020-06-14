import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { withRouter, RouteComponentProps, Redirect } from 'react-router'
import { AppStateType, ShortDataElementType } from '../../../../types/types'
import { ForecastType } from '../../../../types/admin'
import ForecastForm from './ForecastForm'

import { getAdminForecastFromSErver, addForecast, editForecast } from '../../../../redux/admin-reducer'
import { getShortData } from '../../../../redux/app-reducer'
import { ForecastStatusEnum } from '../../../../types/forecasts'

interface MatchParams {
	forecastId: string;
}

interface Props extends RouteComponentProps<MatchParams> { }

const ForecastContainer: FC<Props> = ({ ...props }) => {
	const forecast = useSelector<AppStateType, ForecastType>(state => state.admin.forecasts.currentForecast)
	const dispatch = useDispatch()

	let users = useSelector<AppStateType, Array<ShortDataElementType>>(state => state.app.shortData.users)
	let events = useSelector<AppStateType, Array<ShortDataElementType>>(state => state.app.shortData.events)


	let forecastId = props.match.params.forecastId;
	useEffect(() => {
		if (forecastId) {
			dispatch(getAdminForecastFromSErver(+forecastId))
		}
		dispatch(getShortData('users'))
		dispatch(getShortData('events'))
	}, []);



	const addForecastDispatch = async (formData: ForecastType) => {
		await dispatch(addForecast(formData))

		props.history.push('/admin/forecasts');
	}
	const editForecastDispatch = async (formData: ForecastType) => {
		await dispatch(editForecast(+forecastId, formData))

		props.history.push('/admin/forecasts');
	}


	let initialValues = {}
	let onSubmitFunc
	let breadcrumbsObj
	let buttonText = ""
	if (forecastId) {
		initialValues = forecast
		onSubmitFunc = editForecastDispatch
		breadcrumbsObj = { text: 'Изменение прогноза', link: `/admin/forecasts/${forecastId}/edit` }
		buttonText = "Изменить прогноз"
	} else {
		onSubmitFunc = addForecastDispatch

		initialValues = {
			user_id: users[0].id,
			event_id: events[0].id,
			type: "",
			coefficient: 0,
			bet: 0,
			forecast_text: "",
			status: ForecastStatusEnum.wait,
		}
		breadcrumbsObj = { text: 'Добавление прогноза', link: '/admin/forecasts/add' }
		buttonText = "Добавить прогноз"
	}


	let statusArr = [
		{ id: ForecastStatusEnum.back, value: 'Возврат ставки' },
		{ id: ForecastStatusEnum.wait, value: 'Ставка еще не сыграла' },
		{ id: ForecastStatusEnum.win, value: 'Ставка прошла' },
		{ id: ForecastStatusEnum.loss, value: 'Ставка не прошла' },
	]

	return (
		<ForecastForm
			initialValues={initialValues}
			onSubmitFunc={onSubmitFunc}
			breadcrumbs={[
				{ text: 'Главная', link: '/admin' },
				{ text: 'Прогнозы', link: '/admin/forecasts' },
				{ ...breadcrumbsObj }
			]}
			buttonText={buttonText}

			dropdownLists={{
				users: users,
				events: events,
				statuses: statusArr,
			}}
		/>
	)
}

export default withRouter(ForecastContainer);