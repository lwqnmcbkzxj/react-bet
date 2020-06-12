import React, { FC, useEffect } from 'react'
import s from './Events.module.scss'
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

const Events: FC<Props> = ({ handleSearch, deleteFunction, pages, data, sorting, ...props }) => {
	
	return (
		<div className={s.eventsAdminPage}>
			<AdminTablePage
				pageLink={'events'}
				breadcrumbs={[
					{ text: 'Главная', link: '/admin' },
					{ text: 'События', link: '/admin/events' },
				]}
				actions={{
					search: {
						placeholder: 'Поиск по событию',
						handleSearch: handleSearch
					},
					addNewElementText: 'Добавить новое событие',
					deleteFunction: deleteFunction,
					pages: pages,
					sorting: sorting
				}}
				tableData={data}
			/>

		</div>
	)
}

export default Events;