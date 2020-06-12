import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import s from '../AdminTablePage.module.scss'
import { Switch, Route } from 'react-router'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import ActionsBlock from './ActionsBlock'

import { Paginator } from './Paginator/Paginator'
import parse from 'html-react-parser';
import Preloader from '../../../../Common/Preloader/Preloader'
import { AppStateType } from '../../../../../types/types'

type AdminTableType = {
	pageLink: string
	labels: Array<string>
	data: {
		data: Array<any>
		dataArray: Array<any>
	}
	deleteFunction: (id: number) => void
	AdditionalActionComponent?: any
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
	AdditionalActionComponent,
	pages,
	...props }) => {

	const isFetchingArray = useSelector<AppStateType, Array<string>>(state => state.admin.isFetchingArray)

	return (
		<div className={s.adminTableHolder}>

			<table className={s.adminTable}>
				<tr className={s.tableHeader}>
					{labels.map((label, counter) =>
						<th className={s.tableCell} key={'label' + counter}><div>{label}</div></th>
					)}
					<th className={s.tableCell}><div>Действие</div></th>
				</tr>


				{!isFetchingArray.includes(pageLink) && <tbody className={s.tableBody}>
					{data.data.map((dataItem: any, counter: number) =>

						<tr className={s.tableRow} key={counter}>
							{(data.dataArray[counter].map((item: any, counter: number) =>
								<td className={s.tableCell} key={"" + item + counter}>
									<div dangerouslySetInnerHTML={{ __html: item }}></div>
								</td>
							))}
							<td className={s.tableCell}>
								<ActionsBlock
									id={dataItem.id}
									pageLink={pageLink}
									deleteFunction={deleteFunction}
									AdditionalActionComponent={AdditionalActionComponent}
								/>
							</td>
						</tr>
					)}
				</tbody>}


			</table>
			{data.data.length === 0 && pages.pagesCount === 1 ?
				<div className={s.noData}>Данные отсутствуют</div> : <div style={{ opacity: !isFetchingArray.includes(pageLink) ? 1 : 0 }}><Paginator pages={pages} /></div>
			}

			{isFetchingArray.includes(pageLink) && <Preloader />}



		</div>
	)
}

export default AdminTable;