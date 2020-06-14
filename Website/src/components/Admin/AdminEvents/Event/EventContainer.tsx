import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { withRouter, RouteComponentProps, Redirect } from 'react-router'
import { AppStateType, ShortDataElementType } from '../../../../types/types'
import { EventType } from '../../../../types/admin'
import EventForm from './EventForm'

import { getAdminEventFromServer, addEvent, editEvent } from '../../../../redux/admin-reducer'
import { formatDateSimply } from '../../../../utils/formatDate'
import { MatchStatusEnum } from '../../../../types/matches'
import { getMatchStatus } from '../../../../utils/getValueFromEnumCode'
import { getShortData } from '../../../../redux/app-reducer'

interface MatchParams {
	eventId: string;
}





interface ArticleProps extends RouteComponentProps<MatchParams> { }

const ArticleContainer: FC<ArticleProps> = ({ ...props }) => {
	const event = useSelector<AppStateType, EventType>(state => state.admin.events.currentEvent)
	const championships = useSelector<AppStateType, Array<ShortDataElementType>>(state => state.app.shortData.championships)
	const dispatch = useDispatch()

	let eventId = props.match.params.eventId;
	useEffect(() => {
		if (eventId) {
			dispatch(getAdminEventFromServer(+eventId))
		}
		dispatch(getShortData('championships'))
	}, []);


	const addEventDispatch = async (formData: EventType) => {
		await dispatch(addEvent(formData))

		props.history.push('/admin/events');
	}
	const editEventDispatch = async (formData: EventType) => {
		await dispatch(editEvent(+eventId, formData))

		props.history.push('/admin/events');
	}


	let initialValues = {} as any
	let onSubmitFunc
	let breadcrumbsObj
	let buttonText = ""
	if (eventId) {
		initialValues = { ...event }
		initialValues.created_at = formatDateSimply(initialValues.created_at)
		onSubmitFunc = editEventDispatch
		breadcrumbsObj = { text: 'Изменение события', link: `/admin/events/${eventId}/edit` }
		buttonText = "Изменить событие"
	} else {
		onSubmitFunc = addEventDispatch

		initialValues = {
			sport_id: 1,
			championship_id: championships[0].id,
			title: "",
			start: "",
			status: "",
			forecasts_count: 0,
		}
		breadcrumbsObj = { text: 'Добавление события', link: '/admin/events/add' }
		buttonText = "Добавить событие"
	}

	let statusArr = [
		{ id: MatchStatusEnum.uncompleted, value: getMatchStatus(MatchStatusEnum.uncompleted) },
		{ id: MatchStatusEnum.completed, value: getMatchStatus(MatchStatusEnum.completed) },
	]


	return (
		<EventForm
			initialValues={initialValues}
			onSubmitFunc={onSubmitFunc}
			breadcrumbs={[
				{ text: 'Главная', link: '/admin' },
				{ text: 'События', link: '/admin/events' },
				{ ...breadcrumbsObj }
			]}
			buttonText={buttonText}
			dropdownLists={{
				statuses: statusArr,
				championships: championships
			}}
		/>
	)
}

export default withRouter(ArticleContainer);