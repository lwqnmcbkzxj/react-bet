import React, { FC } from 'react';
import { Link } from 'react-router-dom'
import s from '../Bookmakers.module.scss';
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRubleSign, faCheck, faTimes, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { BookmakerType } from '../../../types/bookmakers';
import contentImg from '../../../assets/img/content-img-holder.png'

import { BookmakersListElementPlaceholder } from '../../Common/Placeholders/BookmakersPlaceholder'

type BookmakersListElementPropsType = {
	bookmaker: BookmakerType
	position: number
	isFetching: boolean
}

const getBookmakerRatingClassName = (value: number) => {
	let raingClass
	if (value > 7) {
		raingClass = s.positive
	} else if (value > 3.5) {
		raingClass = s.neutral
	} else {
		raingClass = s.negative
	}
	return raingClass
}

const BookmakersListElement: FC<BookmakersListElementPropsType> = ({ bookmaker, position, isFetching, ...props }) => {
	if (isFetching) {
		return <BookmakersListElementPlaceholder />
	}

	let checkedIcon
	let checkedClass
	// if (bookmaker.isChecked) {
	// 	checkedIcon = faCheck
	// 	checkedClass = s.positive
	// } else {
	// 	checkedIcon = faTimes
	// 	checkedClass = s.negative
	// }



	return (
		bookmaker.id ? 
		<div className={s.bookmaker}>
			<div className={s.position}>{position}</div>
			<Link to={`bookmakers/${bookmaker.id}`} className={s.company}>
				<img src={ bookmaker.image ? "http://betting-hub.sixhands.co/" + bookmaker.image : contentImg } alt="bookmaker-img" />
			</Link>
			<div className={s.isChecked}>
				{/* <FontAwesomeIcon icon={checkedIcon} className={checkedClass}/> */}
			</div>
			<div className={s.rating}>
				<span className={classNames(s.ratingNumber, getBookmakerRatingClassName(bookmaker.rating))}>
					{bookmaker.rating.toFixed(2)}
				</span>
				<span className={s.maxRating}>/10</span>
			</div>
			<div className={s.bonus}>
				{bookmaker.bonus.toLocaleString()}
				<span><FontAwesomeIcon icon={faRubleSign} /></span>
			</div>
			<div className={s.review}>
				<Link to={`/bookmakers/${bookmaker.id}`}>Обзор</Link>
			</div>
			<div className={s.link}>
				<button>
					<a href={bookmaker.link} className={s.desktopLink}>Сайт</a>
					<a href={bookmaker.link} className={s.mobileLink}><FontAwesomeIcon icon={faExternalLinkAlt} /></a>
				</button>
				
			</div>
			</div>
			: <></>
	) 
}
export default BookmakersListElement;