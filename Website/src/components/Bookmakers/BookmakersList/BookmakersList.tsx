import React, { FC } from 'react';
import s from '../Bookmakers.module.scss';
import classNames from 'classnames'
import { BookmakerType } from '../../../types/bookmakers'

import BookmakersListElement from './BookmakersListElement'


type BookmakersListPropsType = {
	bookmakers: Array<BookmakerType>
	limit?: number
	isMainpage?: boolean
}


const BookmakersList: FC<BookmakersListPropsType> = ({ bookmakers, limit = 0, isMainpage = false, ...props }) => {
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
					key={bookmaker.id}
					position={counter + 1}
					bookmaker={bookmaker}
				/>
			)}

		</div>
	)
}
export default BookmakersList;