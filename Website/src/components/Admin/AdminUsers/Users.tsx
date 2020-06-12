import React, { FC, useEffect } from 'react'
import s from './Users.module.scss'
import AdminTablePage from '../Common/AdminTablePage/AdminTablePage'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChromecast  } from '@fortawesome/free-brands-svg-icons'


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
const AdditionalActionComponent = ({...propsValues}) => {
	return <Link to={`/admin/users/${propsValues.id}/forecasts`}>
		<FontAwesomeIcon icon={faChromecast}/>
	</Link>
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
					AdditionalActionComponent: AdditionalActionComponent,
					pages: pages
				}}
				tableData={data}
			/>

		</div>
	)
}

export default Users;