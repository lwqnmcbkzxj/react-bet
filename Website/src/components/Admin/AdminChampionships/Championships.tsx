import React, { FC, useEffect } from 'react'
import s from './Championships.module.scss'
import AdminTablePage from '../Common/AdminTablePage/AdminTablePage'
import { SortedLabelType } from '../../../types/types'


type Props = {
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

const Championships: FC<Props> = ({ handleSearch, deleteFunction, pages, data, sorting, ...props }) => {
	
	return (
		<div className={s.championshipsAdminPage}>
			<AdminTablePage
				pageLink={'championships'}
				breadcrumbs={[
					{ text: 'Главная', link: '/admin' },
					{ text: 'Пользователи', link: '/admin/championships' },
				]}
				actions={{
					search: {
						placeholder: 'Поиск по событию',
						handleSearch: handleSearch
					},
					addNewElementText: 'Добавить новый чемпионат',
					deleteFunction: deleteFunction,
					pages: pages,
					sorting: sorting

				}}
				tableData={data}
			/>

		</div>
	)
}

export default Championships;