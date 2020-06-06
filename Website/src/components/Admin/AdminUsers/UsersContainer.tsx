import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import s from './Admin.module.scss'
import { Switch, Route } from 'react-router'
import Users from './Users'
import { AppStateType } from '../../../types/types'

import { UserType } from '../../../types/admin'
// import { deleteArticle } from '../../../redux/admin-reducer'
import { formatDate } from '../../../utils/formatDate'
import { getAdminUsersFromServer, deleteUser } from '../../../redux/admin-reducer'

enum rolesNamesEnum {

}

const UsersContainer: FC = ({ ...props }) => {
	const dispatch = useDispatch()
	const users = useSelector<AppStateType, Array<UserType>>(state => state.admin.users.users)
	const pagesCount = useSelector<AppStateType, number>(state => state.admin.pagesCount)

	const [currentPage, changeCurrentPage] = useState(0)
	const [pagesPerPage, changePagesPerPage] = useState(10)

	const handleChangeCurrentPage = (page: number) => {
		changeCurrentPage(page)
	}
	const handleChangePagesPerPage = (pagesPerPage: number) => {
		changePagesPerPage(pagesPerPage)
	}

	const getUsers = (searchText = "") => {
		dispatch(getAdminUsersFromServer(currentPage + 1, pagesPerPage, searchText, 'login'))
	}

	useEffect(() => {
		getUsers()
	}, [currentPage, pagesPerPage])
	useEffect(() => {
		getUsers()
	}, [])


	const handleSearch = (searchText: string) => {
		getUsers(searchText)
	}

	const deleteFunction = async (id: number) => {
		await dispatch(deleteUser(id))
		getUsers()
	}

	let dataArray = [] as any
	users.map(dataObj => dataArray.push([
		dataObj.id, dataObj.login, formatDate(dataObj.created_at), dataObj.platform, 0, 0
		
	]))


	return (
		<Users
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
			labels: ['ID', 'Логин', 'Дата регистрации', 'Платформа', 'Роль', 'Кол-во прогнозов'],
			data: users,
			dataArray: dataArray
		}}
		
		/>
	)
}

export default UsersContainer;