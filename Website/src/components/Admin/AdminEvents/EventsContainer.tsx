import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Events from './Events'
import { AppStateType } from '../../../types/types'

import { EventType } from '../../../types/admin'
import { formatDate } from '../../../utils/formatDate'
import { getAdminEventsFromServer, deleteEvent } from '../../../redux/admin-reducer'
import { getRoleName } from '../../../utils/getRoleName'
import { getMatchStatus } from '../../../utils/getStatus'


const EventsContainer: FC = ({ ...props }) => {
	const dispatch = useDispatch()
	const events = useSelector<AppStateType, Array<EventType>>(state => state.admin.events.events)
	const pagesCount = useSelector<AppStateType, number>(state => state.admin.pagesCount)

	const [currentPage, changeCurrentPage] = useState(0)
	const [pagesPerPage, changePagesPerPage] = useState(10)

	const handleChangeCurrentPage = (page: number) => {
		changeCurrentPage(page)
	}
	const handleChangePagesPerPage = (pagesPerPage: number) => {
		changePagesPerPage(pagesPerPage)
	}

	const getEvents = (searchText = "") => {
		dispatch(getAdminEventsFromServer(currentPage + 1, pagesPerPage, searchText, 'login'))
	}

	useEffect(() => {
		getEvents()
	}, [currentPage, pagesPerPage])


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
			handlePageChange: handleChangeCurrentPage,
			pagesPerPage: pagesPerPage,
			handleChangePagesPerPage: handleChangePagesPerPage,
		}}
		data={{
			labels: ['ID', 'Событие', 'Вид спорта', 'Статус', 'Кол-во прогнозов', 'Дата создания'],
			data: events,
			dataArray: dataArray
		}}
		
		/>
	)
}

export default EventsContainer;