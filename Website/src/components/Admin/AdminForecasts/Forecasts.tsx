import React, { FC, useEffect, useState } from 'react'
import s from './Forecasts.module.scss'
import AdminTablePage from '../Common/AdminTablePage/AdminTablePage'
import { PagePropsType } from '../types'

const Forecasts: FC<PagePropsType> = ({ handleSearch, deleteFunction, pages, data, sorting, ...props }) => {
	return (
		<div className={s.forecastsAdminPage}>
			<AdminTablePage
				pageLink={'forecasts'}
				breadcrumbs={[
					{ text: 'Главная', link: '/admin' },
					{ text: 'Прогнозы', link: '/admin/forecasts' },
				]}
				actions={{
					search: {
						placeholder: 'Поиск',
						handleSearch: handleSearch
					},
					addNewElementText: 'Добавить новый прогноз',
					deleteFunction: deleteFunction,
					pages: pages,
					sorting: sorting

				}}
				tableData={data}
			/>

		</div>
	)
}

export default Forecasts;