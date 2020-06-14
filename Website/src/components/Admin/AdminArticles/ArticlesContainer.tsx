import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"

import Articles from './Articles'
import { AppStateType } from '../../../types/types'
import { ArticleType } from '../../../types/admin'

import { getAdminArticlesFromServer, deleteArticle } from '../../../redux/admin-reducer'
import { formatDate } from '../../../utils/formatDate'
import { SortDirection } from 'react-virtualized'

const ArticlesContainer: FC = ({ ...props }) => {
	const dispatch = useDispatch()
	const articles = useSelector<AppStateType, Array<ArticleType>>(state => state.admin.articles.articles)
	const pagesCount = useSelector<AppStateType, number>(state => state.admin.pagesCount)

	const [currentPage, changeCurrentPage] = useState(0)
	const [pagesPerPage, changePagesPerPage] = useState(10)

	const [sortedLabel, setSortedLabel] = useState('id')
	const [sortDirection, setSortDirection] = useState('desc')
	

	const getArticles = (searchText = "") => {
		dispatch(getAdminArticlesFromServer(currentPage + 1, pagesPerPage, searchText, 'content'))
	}

	useEffect(() => {
		getArticles()
	}, [currentPage, pagesPerPage])
	useEffect(() => {
		getArticles()
	}, [])


	const handleSearch = (searchText: string) => {
		getArticles(searchText)
	}

	const deleteFunction = async (id: number) => {
		await dispatch(deleteArticle(id))
		getArticles()
	}

	let dataArray = [] as any
	articles.map(dataObj => dataArray.push([
		dataObj.id, dataObj.title, dataObj.category_name, dataObj.content, dataObj.is_published ? 'Да' : 'Нет', formatDate(dataObj.created_at), dataObj.created_by_login
	]))


	return (
		<Articles
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
					{ value: 'ID', name: '' },
					{ value: 'Название', name: '' },
					{ value: 'Категория', name: '' },
					{ value: 'Содержание', name: '' },
					{ value: 'Опубликована', name: '' },
					{ value: 'Дата создания', name: '' },
					{ value: 'Создан', name: '' },
				],
				data: articles,
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

export default ArticlesContainer;