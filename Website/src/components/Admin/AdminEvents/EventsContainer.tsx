import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Events from './Events'
import { AppStateType } from '../../../types/types'

import { EventType } from '../../../types/admin'
import { formatDate } from '../../../utils/formatDate'
import { getAdminEventsFromServer, deleteEvent } from '../../../redux/admin-reducer'
import { getRoleName, getMatchStatus } from '../../../utils/getValueFromEnumCode'


const EventsContainer: FC = ({ ...props }) => {
	const dispatch = useDispatch()
	const events = useSelector<AppStateType, Array<EventType>>(state => state.admin.events.events)
	const pagesCount = useSelector<AppStateType, number>(state => state.admin.pagesCount)

	const [currentPage, changeCurrentPage] = useState(0)
	const [pagesPerPage, changePagesPerPage] = useState(10)

	const [sortedLabel, setSortedLabel] = useState('id')
	const [sortDirection, setSortDirection] = useState('asc')

	const getEvents = (searchText = "") => {
		dispatch(getAdminEventsFromServer(currentPage + 1, pagesPerPage, searchText, 'login', sortedLabel, sortDirection))
	}

	useEffect(() => {
		getEvents()
	}, [currentPage, pagesPerPage, sortedLabel, sortDirection])


	const handleSearch = (searchText: string) => {
		getEvents(searchText)
	}

	const deleteFunction = async (id: number) => {
		await dispatch(deleteEvent(id))
		getEvents()
	}

	let dataArray = [] as any
	events.map(dataObj => dataArray.push([
		dataObj.id, dataObj.title, dataObj.sport.name, getMatchStatus(dataObj.status), dataObj.forecasts_count, formatDate(dataObj.created_at)
	]))


	return (
		<Events
			handleSearch={handleSearch}
			deleteFunction={deleteFunction}
			pages={{
				pagesCount: pagesCount,
				currentPage: currentPage,
				handlePageChange: changeCurrentPage,
				pagesPerPage: pagesPerPage,
				handleChangePagesPerPage: changePagesPerPage,
			}}
			data={{
				labels: [
					{ name: 'id', value: 'ID' },
					{ name: 'title', value: 'Событие' },
					{ name: 'sport_id', value: 'Вид спорта' },
					{ name: 'status', value: 'Статус' },
					{ name: '', value: 'Кол-во прогнозов' },
					{ name: 'created_at', value: 'Дата создания' },
				],
				data: events,
				dataArray: dataArray
			}}
			sorting={{
				sortedLabel,
				sortDirection,
				setSortedLabel,
				setSortDirection
			}}

		/>
	)
}

export default EventsContainer;