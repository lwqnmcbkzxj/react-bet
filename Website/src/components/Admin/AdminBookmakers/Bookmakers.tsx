import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import s from './Bookmakers.module.scss'
import AdminTablePage from '../Common/AdminTablePage/AdminTablePage'
import { PagePropsType } from '../types'



const Articles: FC<PagePropsType> = ({ handleSearch, deleteFunction, pages, data, sorting, ...props }) => {
	return (
		<div className={s.articlesAdminPage}>
			<AdminTablePage
				pageLink={'bookmakers'}
				breadcrumbs={[
					{ text: 'Главная', link: '/admin' },
					{ text: 'Букмекеры', link: '/admin/bookmakers' },
				]}
				actions={{
					search: {
						placeholder: 'Поиск по названию и описанию',
						handleSearch: handleSearch
					},
					addNewElementText: 'Добавить нового букмекера',
					deleteFunction: deleteFunction,
					pages: pages,
					sorting: sorting
				}}
				tableData={data}
			/>

		</div>
	)
}

export default Articles;