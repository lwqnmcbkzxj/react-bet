import React, { FC, useState, useEffect, Children } from 'react'
import s from '../../AdminTablePage.module.scss'
import classNames from 'classnames'
import ReactPaginate from 'react-paginate';
import { ChangePerPageCount } from './ChangePerPageCount'

type PaginatorProps = {
	pages: {
		pagesCount: number
		currentPage: number
		handlePageChange: (pageNumber: number) => void
		pagesPerPage: number
		handleChangePagesPerPage: (pagesPerPage: number) => void
	}
}


export const Paginator: FC<PaginatorProps> = ({ pages, ...props }) => {
	return (
		<div className={s.paginatorHolder}>
			<ChangePerPageCount
				pagesPerPage={pages.pagesPerPage}
				handleChangePagesPerPage={pages.handleChangePagesPerPage}
			/>

			<ReactPaginate
				previousLabel={'<'}
				nextLabel={'>'}
				breakLabel={'...'}
				pageCount={pages.pagesCount}
				marginPagesDisplayed={2}
				pageRangeDisplayed={5}
				onPageChange={(pageNumber) => { pages.handlePageChange(pageNumber.selected) }}
				containerClassName={s.paginator}
				breakClassName={s.paginator__item}
				pageClassName={s.paginator__item}
				nextClassName={classNames(s.paginator__item, s.arrow)}
				previousClassName={classNames(s.paginator__item, s.arrow)}
				activeClassName={s.paginator__item_active}
			/>
		</div>
	);
}
