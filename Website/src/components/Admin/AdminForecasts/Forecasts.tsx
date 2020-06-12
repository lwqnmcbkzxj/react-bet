import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import s from './Forecasts.module.scss'
import AdminTablePage from '../Common/AdminTablePage/AdminTablePage'
import { SortedLabelType } from '../../../types/types'

type ForecastsProps = {
	handleSearch: (searchText: string) => void
	deleteFunction: (id: number) => void
	pages: {
		pagesCount: number
		currentPage: number
		handlePageChange: (pageNumber: number) => void
		pagesPerPage: number
		handleChangePagesPerPage: (pagesPerPage: number) => void
	}
	sorting: {
		sortDirection: string,
		setSortDirection: (direction: string) => void,
		sortedLabel: string
		setSortedLabel: (labelName: string) => void
	}
	data: {
		labels: Array<SortedLabelType>
		data: Array<any>
		dataArray: Array<any>
	}
}

const Forecasts: FC<ForecastsProps> = ({ handleSearch, deleteFunction, pages, data, sorting, ...props }) => {
	return (
		<div className={s.forecastsAdminPage}>
			<AdminTablePage
				pageLink={'forecasts'}
				breadcrumbs={[
					{ text: 'Главная', link: '/admin' },
					{ text: 'Прогнозы', link: '/admin/forecasts' },
				]}
				actions={{
					search: {
						placeholder: 'Поиск',
						handleSearch: handleSearch
					},
					addNewElementText: 'Добавить новый прогноз',
					deleteFunction: deleteFunction,
					pages: pages,
					sorting: sorting

				}}
				tableData={data}
			/>

		</div>
	)
}

export default Forecasts;