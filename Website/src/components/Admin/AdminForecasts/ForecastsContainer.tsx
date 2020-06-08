import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"

import Forecasts from './Forecasts'
import { AppStateType } from '../../../types/types'
import { ForecastType } from '../../../types/admin'

import { getAdminForecastsFromServer, deleteForecast } from '../../../redux/admin-reducer'
import { formatDate } from '../../../utils/formatDate'
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

	const handleChangeCurrentPage = (page: number) => {
		changeCurrentPage(page)
	}
	const handleChangePagesPerPage = (pagesPerPage: number) => {
		changePagesPerPage(pagesPerPage)
	}
	let userId = props.match.params.userId;
	const getForecasts = (searchText = "") => {
		dispatch(getAdminForecastsFromServer(currentPage + 1, pagesPerPage, searchText, 'content', +userId))
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
		// dataObj.id,
		// dataObj.title,
		// dataObj.category_name,
		// dataObj.content, dataObj.status ? 'Да' : 'Нет',
		// formatDate(dataObj.created_at),
		// dataObj.created_by_login
	]))


	return (
		<Forecasts
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
				labels: ['ID', 'Прогноз от', 'Статус'],
				data: forecasts,
				dataArray: dataArray
			}}
		/>
	)
}

export default withRouter(ForecastsContainer);