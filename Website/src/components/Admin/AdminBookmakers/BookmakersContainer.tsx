import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"

import Bookmakers from './Bookmakers'
import { AppStateType } from '../../../types/types'
import { BookmakerType } from '../../../types/admin'

import { getBookmakersFromServer, deleteBookmaker } from '../../../redux/admin-reducer'
import { formatDate } from '../../../utils/formatDate'
import { adminAPI } from '../../../api/api'

const BookmakersContainer: FC = ({ ...props }) => {
	const dispatch = useDispatch()
	const bookmakers = useSelector<AppStateType, Array<BookmakerType>>(state => state.admin.bookmakers.bookmakers)
	const pagesCount = useSelector<AppStateType, number>(state => state.admin.pagesCount)

	const [currentPage, changeCurrentPage] = useState(0)
	const [pagesPerPage, changePagesPerPage] = useState(10)

	
	const [sortedLabel, setSortedLabel] = useState('id')
	const [sortDirection, setSortDirection] = useState('desc')
	const getBookmakers = (searchText = "") => {
		dispatch(getBookmakersFromServer(currentPage + 1, pagesPerPage, searchText, 'title'))
	}

	useEffect(() => {
		getBookmakers()
	}, [currentPage, pagesPerPage])
	

	const handleSearch = (searchText: string) => {
		getBookmakers(searchText)
	}

	const deleteFunction = async (id: number) => {
		await dispatch(deleteBookmaker(id))
		getBookmakers()
	}

	let dataArray = [] as any
	bookmakers.map(dataObj => dataArray.push([
		dataObj.id, dataObj.title, dataObj.content, dataObj.rating, dataObj.bonus, dataObj.link
	]))


	return (
		<Bookmakers
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
					{ value: 'Описание', name: '' },
					{ value: 'Рейтинг', name: '' },
					{ value: 'Бонус', name: '' },
					{ value: 'Ссылка', name: '' },
				],
				data: bookmakers,
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

export default BookmakersContainer;