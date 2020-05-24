import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import s from './Admin.module.scss'
import { Switch, Route } from 'react-router'
import Breadcrumbs from '../../Common/Breadcrumbs/Breadcrumbs'
import AdminTablePage from '../Common/AdminTablePage/AdminTablePage'

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
		labels: Array<string>
		data: Array<any>
		dataArray: Array<any>
	}
}

const Articles: FC<ArticlesProps> = ({ handleSearch, deleteFunction, pages, data, ...props }) => {
	return (
		<AdminTablePage
			pageLink={'articles'}
			breadcrumbs={[
				{ text: 'Главная', link: '/admin' },
				{ text: 'Статьи', link: '/admin/articles' },
			]}
			actions={{
				search: {
					placeholder: 'Поиск по названию и содержанию',
					handleSearch: handleSearch
				},
				addNewElementText: 'Добавить новую статью',
				deleteFunction: deleteFunction,
				pages: pages
			}}
			tableData={data}
		/>
	)
}

export default Articles;