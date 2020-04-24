import React, { FC } from 'react';
import { NavLink } from 'react-router-dom'
import s from './BookmakersList.module.scss';
import classNames from 'classnames'
// import { BookmakerType } from '../../types/bookmakers'

import bookmakerImg1 from '../../../assets/img/bookmaker-img-1.png'
import bookmakerImg2 from '../../../assets/img/bookmaker-img-2.png'
import bookmakerImg3 from '../../../assets/img/bookmaker-img-3.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRubleSign, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { BookmakerType } from '../../../types/bookmakers';

type BookmakersListElementPropsType = {
	bookmaker: BookmakerType
	position: number
}

// https://betcity.ru/
// https://www.ligastavok.ru/

const BookmakersListElement: FC<BookmakersListElementPropsType> = ({ bookmaker, position, ...props }) => {
	let userRating = 9.40;
	let raingClass
	let checkedIcon
	let checkedClass
	if (userRating > 7) {
		raingClass = s.positive
	} else if (userRating > 3.5) {
		raingClass = s.neutral
	} else {
		raingClass = s.negative
	}

	if (true) {
		checkedIcon = faCheck
		checkedClass = s.positive
	} else {
		checkedIcon = faTimes
		checkedClass = s.negative
	}

	return (
		<div className={s.bookmaker}>
			<div className={s.position}>{position}</div>
			<div className={s.company}>
				<img src={bookmakerImg1} alt="bookmaker-img" />
			</div>
			<div className={s.isChecked}>
				<FontAwesomeIcon icon={checkedIcon} className={checkedClass}/>
			</div>
			<div className={s.rating}>
				<span className={classNames(s.ratingNumber, raingClass)}>9.40</span>/10
			</div>
			<div className={s.bonus}>1 000
				<span><FontAwesomeIcon icon={faRubleSign} /></span>
			</div>
			<div className={s.review}>
				<NavLink to="bookmakers/1">Обзор</NavLink>
			</div>
			<div className={s.link}>
				<button>
					<a href="https://betcity.ru/">Сайт</a>
				</button>
			</div>
		</div>
	)
}
export default BookmakersListElement;