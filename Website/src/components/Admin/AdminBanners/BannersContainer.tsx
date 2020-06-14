import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"

import Banners from './Banners'
import { AppStateType, BannerType } from '../../../types/types'

import { getAdminBannersFromServer, deleteBanner } from '../../../redux/admin-reducer'
import { getBannerPosition } from '../../../utils/getValueFromEnumCode'

const BannersContainer: FC = ({ ...props }) => {
	const dispatch = useDispatch()
	const banners = useSelector<AppStateType, Array<BannerType>>(state => state.admin.banners.banners)
	const pagesCount = useSelector<AppStateType, number>(state => state.admin.pagesCount)

	const [currentPage, changeCurrentPage] = useState(0)
	const [pagesPerPage, changePagesPerPage] = useState(10)

	const [sortedLabel, setSortedLabel] = useState('id')
	const [sortDirection, setSortDirection] = useState('desc')
	

	const getBanners = (searchText = "") => {
		dispatch(getAdminBannersFromServer(currentPage + 1, pagesPerPage, searchText, 'content'))
	}

	useEffect(() => {
		getBanners()
	}, [currentPage, pagesPerPage])
	useEffect(() => {
		getBanners()
	}, [])


	const handleSearch = (searchText: string) => {
		getBanners(searchText)
	}

	const deleteFunction = async (id: number) => {
		await dispatch(deleteBanner(id))
		getBanners()
	}

	let dataArray = [] as any
	banners.map(dataObj => dataArray.push([
		dataObj.id, dataObj.title, getBannerPosition(dataObj.position), dataObj.link, dataObj.status ? 'Активен' : 'Неактивен'
	]))


	return (
		<Banners
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
					{ value: 'Расположение', name: '' },
					{ value: 'Ссылка', name: '' },
					{ value: 'Статус', name: '' },
				],
				data: banners,
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

export default BannersContainer;