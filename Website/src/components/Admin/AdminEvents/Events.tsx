import React, { FC, useEffect } from 'react'
import s from './Events.module.scss'
import AdminTablePage from '../Common/AdminTablePage/AdminTablePage'
import { PagePropsType } from '../types'



const Events: FC<PagePropsType> = ({ handleSearch, deleteFunction, pages, data, sorting, ...props }) => {
	
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