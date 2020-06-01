import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"

import Articles from './Articles'
import { AppStateType } from '../../../types/types'
import { ArticleType } from '../../../types/admin'

import { getAdminArticlesFromServer, deleteArticle } from '../../../redux/admin-reducer'
import { formatDate } from '../../../utils/formatDate'

const ArticlesContainer: FC = ({ ...props }) => {
	const dispatch = useDispatch()
	const articles = useSelector<AppStateType, Array<ArticleType>>(state => state.admin.articles.articles)
	const pagesCount = useSelector<AppStateType, number>(state => state.admin.articles.pagesCount)

	const [currentPage, changeCurrentPage] = useState(0)
	const [pagesPerPage, changePagesPerPage] = useState(10)

	const handleChangeCurrentPage = (page: number) => {
		changeCurrentPage(page)
	}
	const handleChangePagesPerPage = (pagesPerPage: number) => {
		changePagesPerPage(pagesPerPage)
	}

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
				handlePageChange: handleChangeCurrentPage,
				pagesPerPage: pagesPerPage,
				handleChangePagesPerPage: handleChangePagesPerPage,
			}}
			data={{
				labels: ['ID', 'Название', 'Категория', 'Содержание', 'Опубликована', 'Дата создания', 'Создан'],
				data: articles,
				dataArray: dataArray
			}}
		/>
	)
}

export default ArticlesContainer;