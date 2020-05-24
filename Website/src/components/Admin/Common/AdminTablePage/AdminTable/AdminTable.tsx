import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import s from '../AdminTablePage.module.scss'
import { Switch, Route } from 'react-router'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import ActionsBlock from './ActionsBlock'

import { Paginator } from './Paginator/Paginator'

type AdminTableType = {
	pageLink: string
	labels: Array<string>
	data: {
		data: Array<any>
		dataArray: Array<any>
	}
	deleteFunction: (id: number) => void

	pages: {
		pagesCount: number
		currentPage: number
		handlePageChange: (pageNumber: number) => void
		pagesPerPage: number
		handleChangePagesPerPage: (pagesPerPage: number) => void
	}
}


const AdminTable: FC<AdminTableType> = ({
	pageLink = "",
	labels = ['ID', 'Заголовок'],
	data,
	deleteFunction,
	pages,
	...props }) => {

	return (
		<div className={s.adminTableHolder}>

			<table className={s.adminTable}>
				<tr className={s.tableHeader}>
					{labels.map((label, counter) =>
						<th className={s.tableCell} key={'label' + counter}><div>{label}</div></th>
					)}
					<th className={s.tableCell}><div>Другое</div></th>
				</tr>

				<tbody className={s.tableBody}>
					{data.data.map((dataItem: any, counter: number) =>

						<tr className={s.tableRow} key={counter}>
							{(data.dataArray[counter].map((item: any, counter: number) =>
								<td className={s.tableCell} key={"" + item + counter}><div>{item}</div></td>
							))}
							<td className={s.tableCell}>
								<ActionsBlock
									id={dataItem.id}
									pageLink={pageLink}
									deleteFunction={deleteFunction}
								/>
							</td>
						</tr>
					)}
				</tbody>
			</table>
			{data.data.length === 0 && pages.pagesCount === 1 ?
				<div className={s.noData}>Данные отсутствуют</div> : <Paginator pages={pages} />
			}
				

		</div>
	)
}

export default AdminTable;