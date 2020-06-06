import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import s from './Users.module.scss'
import { Switch, Route } from 'react-router'
import AdminTablePage from '../Common/AdminTablePage/AdminTablePage'


type UsersProps = {
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

const Users: FC<UsersProps> = ({ handleSearch, deleteFunction, pages, data, ...props }) => {
	return (
		<div className={s.usersAdminPage}>
			<AdminTablePage
				pageLink={'users'}
				breadcrumbs={[
					{ text: 'Главная', link: '/admin' },
					{ text: 'Пользователи', link: '/admin/users' },
				]}
				actions={{
					search: {
						placeholder: 'Поиск по логину',
						handleSearch: handleSearch
					},
					addNewElementText: 'Добавить нового пользователя',
					deleteFunction: deleteFunction,
					pages: pages
				}}
				tableData={data}
			/>

		</div>
	)
}

export default Users;