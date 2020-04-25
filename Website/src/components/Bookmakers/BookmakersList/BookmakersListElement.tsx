import React, { FC } from 'react';
import { NavLink } from 'react-router-dom'
import s from '../Bookmakers.module.scss';
import classNames from 'classnames'
// import { BookmakerType } from '../../types/bookmakers'

import bookmakerImg1 from '../../../assets/img/bookmaker-img-1.png'
import bookmakerImg2 from '../../../assets/img/bookmaker-img-2.png'
import bookmakerImg3 from '../../../assets/img/bookmaker-img-3.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRubleSign, faCheck, faTimes, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { BookmakerType } from '../../../types/bookmakers';

type BookmakersListElementPropsType = {
	bookmaker: BookmakerType
	position: number
}



const BookmakersListElement: FC<BookmakersListElementPropsType> = ({ bookmaker, position, ...props }) => {
	let userRating = bookmaker.rating;
	let raingClass
	if (userRating > 7) {
		raingClass = s.positive
	} else if (userRating > 3.5) {
		raingClass = s.neutral
	} else {
		raingClass = s.negative
	}

	let checkedIcon
	let checkedClass
	if (bookmaker.isChecked) {
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
				<img src={bookmaker.companyImg} alt="bookmaker-img" />
			</div>
			<div className={s.isChecked}>
				<FontAwesomeIcon icon={checkedIcon} className={checkedClass}/>
			</div>
			<div className={s.rating}>
				<span className={classNames(s.ratingNumber, raingClass)}>
					{bookmaker.rating.toFixed(2)}
				</span>
				<span className={s.maxRating}>/10</span>
			</div>
			<div className={s.bonus}>
				{bookmaker.bonus.toLocaleString()}
				<span><FontAwesomeIcon icon={faRubleSign} /></span>
			</div>
			<div className={s.review}>
				<NavLink to={`bookmakers/${bookmaker.id}`}>Обзор</NavLink>
			</div>
			<div className={s.link}>
				<button>
					<a href={bookmaker.link} className={s.desktopLink}>Сайт</a>
					<a href={bookmaker.link} className={s.mobileLink}><FontAwesomeIcon icon={faExternalLinkAlt} /></a>
				</button>
				
			</div>
		</div>
	)
}
export default BookmakersListElement;