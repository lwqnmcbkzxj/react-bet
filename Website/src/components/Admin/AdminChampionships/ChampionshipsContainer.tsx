import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Championships from './Championships'
import { AppStateType } from '../../../types/types'

import { ChampionshipType } from '../../../types/admin'
import { formatDate } from '../../../utils/formatDate'
import { getAdminChampionshipsFromServer, deleteChampionship } from '../../../redux/admin-reducer'
import { getMatchStatus } from '../../../utils/getStatus'


const ChampionshipsContainer: FC = ({ ...props }) => {
	const dispatch = useDispatch()
	const championships = useSelector<AppStateType, Array<ChampionshipType>>(state => state.admin.championships.championships)
	const pagesCount = useSelector<AppStateType, number>(state => state.admin.pagesCount)

	const [currentPage, changeCurrentPage] = useState(0)
	const [pagesPerPage, changePagesPerPage] = useState(10)

	const [sortedLabel, setSortedLabel] = useState('id')
	const [sortDirection, setSortDirection] = useState('desc')

	const getChampionships = (searchText = "") => {
		dispatch(getAdminChampionshipsFromServer(currentPage + 1, pagesPerPage, searchText, 'login'))
	}

	useEffect(() => {
		getChampionships()
	}, [currentPage, pagesPerPage])


	const handleSearch = (searchText: string) => {
		getChampionships(searchText)
	}

	const deleteFunction = async (id: number) => {
		await dispatch(deleteChampionship(id))
		getChampionships()
	}

	let dataArray = [] as any
	championships.map(dataObj => dataArray.push([
		dataObj.id, dataObj.name, dataObj.sport.name, formatDate(dataObj.created_at)
	]))


	return (
		<Championships
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
					{ name: 'title', value: 'Название' },
					{ name: 'sport_name', value: 'Вид спорта' },
					{ name: 'created_at', value: 'Дата создания' },
				],
				data: championships,
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

export default ChampionshipsContainer;