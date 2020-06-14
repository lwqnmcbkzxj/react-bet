import React, { FC, useEffect } from 'react'
import s from './Championships.module.scss'
import AdminTablePage from '../Common/AdminTablePage/AdminTablePage'
import { PagePropsType } from '../types'


const Championships: FC<PagePropsType> = ({ handleSearch, deleteFunction, pages, data, sorting, ...props }) => {
	
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