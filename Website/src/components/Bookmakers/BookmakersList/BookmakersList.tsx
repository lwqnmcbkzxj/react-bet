import React, { FC } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from '../../../types/types'
import { BookmakerType } from '../../../types/bookmakers'

import s from '../Bookmakers.module.scss';
import classNames from 'classnames'

import BookmakersListElement from './BookmakersListElement'


type BookmakersListPropsType = {
	bookmakers: Array<BookmakerType>
	limit?: number
	isMainpage?: boolean
}


const BookmakersList: FC<BookmakersListPropsType> = ({ bookmakers, limit = 0, isMainpage = false, ...props }) => {
	const isFetching = useSelector<AppStateType, boolean>(state => state.bookmakers.isFetching)

	let userRating = 9.40;
	let raingClass
	if (userRating > 7) {
		raingClass = s.positive
	} else if (userRating > 3.5) {
		raingClass = s.neutral
	} else {
		raingClass = s.negative
	}

	return (
		<div className={classNames(s.bookmakersList, { [s.isMainpage]: isMainpage })}>
			<div className={s.listHeader}>
				<div className={s.position}>№</div>
				<div className={s.company}>Контора</div>
				<div className={s.isChecked}></div>
				<div className={s.rating}>Рейтинг</div>
				<div className={s.bonus}>Бонус</div>
				<div className={s.review}></div>
				<div className={s.link}></div>
			</div>


			{bookmakers.map((bookmaker, counter) =>
				(counter < limit || limit === 0) &&
				<BookmakersListElement
					isFetching={isFetching}
					key={bookmaker.id}
					position={counter + 1}
					bookmaker={bookmaker}
				/>
			)}

		</div>
	)
}
export default BookmakersList;