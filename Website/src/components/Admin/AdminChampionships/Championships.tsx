import React, { FC, useEffect } from 'react'
import s from './Championships.module.scss'
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

const Championships: FC<Props> = ({ handleSearch, deleteFunction, pages, data, ...props }) => {
	
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
					pages: pages
				}}
				tableData={data}
			/>

		</div>
	)
}

export default Championships;