import React, { FC, useEffect, useState } from 'react'
import s from './Banners.module.scss'
import AdminTablePage from '../Common/AdminTablePage/AdminTablePage'
import { PagePropsType } from '../types'


const Banners: FC<PagePropsType> = ({ handleSearch, deleteFunction, pages, data, sorting, ...props }) => {
	return (
		<div className={s.articlesAdminPage}>
			<AdminTablePage
				pageLink={'banners'}
				breadcrumbs={[
					{ text: 'Главная', link: '/admin' },
					{ text: 'Баннеры', link: '/admin/banners' },
				]}
				actions={{
					search: {
						placeholder: 'Поиск по названию',
						handleSearch: handleSearch
					},
					addNewElementText: 'Добавить новый баннер',
					deleteFunction: deleteFunction,
					pages: pages,
					sorting: sorting
				}}
				tableData={data}
			/>

		</div>
	)
}

export default Banners;