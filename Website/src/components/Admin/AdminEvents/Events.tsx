import React, { FC, useEffect } from 'react'
import s from './Events.module.scss'
import AdminTablePage from '../Common/AdminTablePage/AdminTablePage'


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
	data: {
		labels: Array<string>
		data: Array<any>
		dataArray: Array<any>
	}
}

const Events: FC<Props> = ({ handleSearch, deleteFunction, pages, data, ...props }) => {
	
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
					pages: pages
				}}
				tableData={data}
			/>

		</div>
	)
}

export default Events;