import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import s from './Admin.module.scss'
import { Switch, Route } from 'react-router'
import Users from './Users'
import { AppStateType } from '../../../types/types'

import { UserType } from '../../../types/admin'
import { formatDate } from '../../../utils/formatDate'
import { getAdminUsersFromServer, deleteUser } from '../../../redux/admin-reducer'
import { getRoleName } from '../../../utils/getValueFromEnumCode'


const UsersContainer: FC = ({ ...props }) => {
	const dispatch = useDispatch()
	const users = useSelector<AppStateType, Array<UserType>>(state => state.admin.users.users)
	const pagesCount = useSelector<AppStateType, number>(state => state.admin.pagesCount)

	const [currentPage, changeCurrentPage] = useState(0)
	const [pagesPerPage, changePagesPerPage] = useState(10)

	const [sortedLabel, setSortedLabel] = useState('id')
	const [sortDirection, setSortDirection] = useState('desc')

	const getUsers = (searchText = "") => {
		dispatch(getAdminUsersFromServer(currentPage + 1, pagesPerPage, searchText, 'login', sortedLabel, sortDirection))
	}

	useEffect(() => {
		getUsers()
	}, [currentPage, pagesPerPage, sortedLabel, sortDirection])


	const handleSearch = (searchText: string) => {
		getUsers(searchText)
	}

	const deleteFunction = async (id: number) => {
		await dispatch(deleteUser(id))
		getUsers()
	}

	let dataArray = [] as any
	users.map(dataObj => dataArray.push([
		dataObj.id, dataObj.login, formatDate(dataObj.created_at), dataObj.platform, getRoleName(dataObj.role_id), dataObj.forecasts_count
	]))


	return (
		<Users
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
					{ name: 'login', value: 'Логин' },
					{ name: 'created_at', value: 'Дата регистрации' },
					{ name: 'platform', value: 'Платформа' },
					{ name: 'role_id', value: 'Роль' },
					{ name: '', value: 'Кол-во прогнозов' },
				],
				data: users,
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

export default UsersContainer;