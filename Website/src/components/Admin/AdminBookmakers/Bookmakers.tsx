import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import s from './Bookmakers.module.scss'
import { Switch, Route } from 'react-router'
import Breadcrumbs from '../../Common/Breadcrumbs/Breadcrumbs'
import AdminTablePage from '../Common/AdminTablePage/AdminTablePage'
import { SortedLabelType } from '../../../types/types'

type ArticlesProps = {
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
		labels: Array<SortedLabelType>
		data: Array<any>
		dataArray: Array<any>
	}
	sorting: {
		sortDirection: string,
		setSortDirection: (direction: string) => void,
		sortedLabel: string
		setSortedLabel: (labelName: string) => void
	}
	getAllData:() => void
}

const Articles: FC<ArticlesProps> = ({ handleSearch, deleteFunction, pages, data, sorting, ...props }) => {
	return (
		<div className={s.articlesAdminPage}>
			<AdminTablePage
				pageLink={'bookmakers'}
				breadcrumbs={[
					{ text: 'Главная', link: '/admin' },
					{ text: 'Букмекеры', link: '/admin/bookmakers' },
				]}
				actions={{
					search: {
						placeholder: 'Поиск по названию и описанию',
						handleSearch: handleSearch
					},
					addNewElementText: 'Добавить нового букмекера',
					deleteFunction: deleteFunction,
					pages: pages,
					sorting: sorting
				}}
				tableData={data}
				getAllData={props.getAllData}
			/>

		</div>
	)
}

export default Articles;