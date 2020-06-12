import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"

import Forecasts from './Forecasts'
import { AppStateType } from '../../../types/types'
import { ForecastType } from '../../../types/admin'

import { getAdminForecastsFromServer, deleteForecast } from '../../../redux/admin-reducer'
import { formatDate } from '../../../utils/formatDate'
import { getForecastStatus } from '../../../utils/getForecastStatus'

import { withRouter, RouteComponentProps } from 'react-router'

interface MatchParams {
	userId: string;
}

interface Props extends RouteComponentProps<MatchParams> { }

const ForecastsContainer: FC<Props> = ({ ...props }) => {
	const dispatch = useDispatch()
	const forecasts = useSelector<AppStateType, Array<ForecastType>>(state => state.admin.forecasts.forecasts)
	const pagesCount = useSelector<AppStateType, number>(state => state.admin.pagesCount)

	const [currentPage, changeCurrentPage] = useState(0)
	const [pagesPerPage, changePagesPerPage] = useState(10)

	const [sortedLabel, setSortedLabel] = useState('id')
	const [sortDirection, setSortDirection] = useState('desc')


	let userId = props.match.params.userId;
	const getForecasts = (searchText = "") => {
		dispatch(getAdminForecastsFromServer(currentPage + 1, pagesPerPage, searchText, '', +userId))
	}

	useEffect(() => {
		getForecasts()
	}, [currentPage, pagesPerPage])
	useEffect(() => {
		getForecasts()
	}, [])


	const handleSearch = (searchText: string) => {
		getForecasts(searchText)
	}

	const deleteFunction = async (id: number) => {
		await dispatch(deleteForecast(id))
		getForecasts()
	}

	let dataArray = [] as any
	forecasts.map(dataObj => dataArray.push([
		dataObj.id,
		dataObj.user_data.login,
		dataObj.event_data.event,
		dataObj.forecast_created_at,
		getForecastStatus(dataObj.bet_data.status)
	]))


	return (
		<Forecasts
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
					{ name: 'user_id', value: 'Прогноз от' },
					{ name: 'event', value: 'Событие' },
					{ name: 'created_at', value: 'Дата создания' },
					{ name: 'status', value: 'Статус' },
				],
				data: forecasts,
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

export default withRouter(ForecastsContainer);