import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import s from './Forecasts.module.scss'
import AdminTablePage from '../Common/AdminTablePage/AdminTablePage'

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
	data: {
		labels: Array<string>
		data: Array<any>
		dataArray: Array<any>
	}
}

const Articles: FC<ForecastsProps> = ({ handleSearch, deleteFunction, pages, data, ...props }) => {
	return (
		<div className={s.articlesAdminPage}>
			<AdminTablePage
				pageLink={'articles'}
				breadcrumbs={[
					{ text: 'Главная', link: '/admin' },
					{ text: 'Прогнозы', link: '/admin/forecasts' },
				]}
				actions={{
					search: {
						placeholder: 'Поиск по событию',
						handleSearch: handleSearch
					},
					addNewElementText: 'Добавить новый прогноз',
					deleteFunction: deleteFunction,
					pages: pages
				}}
				tableData={data}
			/>

		</div>
	)
}

export default Articles;