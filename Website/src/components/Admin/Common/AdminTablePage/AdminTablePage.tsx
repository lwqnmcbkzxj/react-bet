import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import s from './AdminTablePage.module.scss'
import { Switch, Route } from 'react-router'
import { Link } from 'react-router-dom'
import Breadcrumbs, { BreadcrumbsPropsType } from '../../../Common/Breadcrumbs/Breadcrumbs'
import ActionButton from '../../../Common/ActionButton/ActionButton'
import Search from '../Search/Search'
import ExportButton from '../ExportButton/ExportButton'
import AdminTable from './AdminTable/AdminTable'
import { SortedLabelType } from '../../../../types/types'

type AdminTablePageType = {
	pageLink: string
	breadcrumbs:  Array<{ link: string, text: string }>	
	actions: {
		search: {
			placeholder: string
			handleSearch: (searchText: string) => void			
		}
		addNewElementText: string
		deleteFunction: (id: number) => void
		pages: {
			pagesCount: number
			currentPage: number
			handlePageChange: (pageNumber: number) => void
			pagesPerPage: number
			handleChangePagesPerPage: (pagesPerPage: number) => void
		}
		AdditionalActionComponent?: any
		sorting: {
			sortDirection: string,
			setSortDirection: (direction: string) => void,
			sortedLabel: string
			setSortedLabel: (labelName: string) => void
		}
	}
	tableData: {
		labels: Array<SortedLabelType>
		data: Array<any>
		dataArray: Array<any>
	}
	getAllData?: () => void
}


const AdminTablePage: FC<AdminTablePageType> = ({ pageLink, breadcrumbs, actions, tableData, getAllData = () => {}, ...props }) => {
	return (
		<div>
			<Breadcrumbs pathParams={breadcrumbs}/>

			<div className={s.adminTableActions}>
				<Search
					handleSearch={actions.search.handleSearch}
					placeholder={actions.search.placeholder}
				/>
				<ExportButton labels={tableData.labels} tableName={pageLink} getAllData={getAllData}/>
				<Link to={`${pageLink}/add`}><ActionButton value={actions.addNewElementText} /></Link>
			</div>


			<AdminTable
				pageLink={pageLink}
				labels={tableData.labels}
				data={{
					data: tableData.data,
					dataArray: tableData.dataArray
				}}
				deleteFunction={actions.deleteFunction}
				pages={actions.pages}
				sorting={actions.sorting}
				AdditionalActionComponent={actions.AdditionalActionComponent}
			/>
		</div>
	)
}

export default AdminTablePage;