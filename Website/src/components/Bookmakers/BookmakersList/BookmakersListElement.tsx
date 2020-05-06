import React, { FC } from 'react';
import { Link } from 'react-router-dom'
import s from '../Bookmakers.module.scss';
import classNames from 'classnames'
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
			<Link to={`bookmakers/${bookmaker.id}`} className={s.company}>
				<img src={bookmaker.companyLogo} alt="bookmaker-img" />
			</Link>
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
				<Link to={`bookmakers/${bookmaker.id}`}>Обзор</Link>
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