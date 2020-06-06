import React, { FC, useState } from 'react';
import s from './Bookmaker.module.scss';
import classNames from 'classnames'
import Breadcrumbs from '../Common/Breadcrumbs/Breadcrumbs'
import { Link } from 'react-router-dom'
import { BookmakerType } from '../../types/bookmakers';
import LikesBlock from '../Common/ElementStats/LikesBlock';
import contentImg from '../../assets/img/content-img-holder.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRubleSign, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import CommentsBlock from '../Common/CommentsBlock/CommentsBlock';
import GoBackBlock from '../Common/GoBackBlock/GoBackBlock';

import { apiURL } from '../../api/api'

type BookmakerPropsType = {
	bookmaker: BookmakerType
}
const getBookmakerStatsClass = (value: number) => {
	let className
	if (value > 7) {
		className = s.positive
	} else if (value > 3.5) {
		className = s.neutral
	} else {
		className = s.negative
	}
	return className
}
const Bookmaker: FC<BookmakerPropsType> = ({ bookmaker, ...props }) => {
	// let checkedIcon
	// let checkedClass
	// if (bookmaker.isChecked) {
	// 	checkedIcon = faCheck
	// 	checkedClass = s.positive
	// } else {
	// 	checkedIcon = faTimes
	// 	checkedClass = s.negative
	// }
	return (
		<div className={s.bookmaker}>
			<GoBackBlock
				link={'bookmakers'}
				linkText={'Рейтинг букмекеров'}
			/>


			<Breadcrumbs pathParams={[
				{ text: 'Главная', link: '' },
				{ text: 'Рейтинг букмекеров', link: '/bookmakers' },
				{ text: 'Букмекерская контора ${bookmaker.title}', link: `/bookmakers/${bookmaker.id}` },]} />

			<div className="pageHeader">
				<h1 className="pageName">{`Букмекерская контора ${bookmaker.title}`}</h1>
			</div>

			<div className={s.bookmakerInfo}>
				<div className={s.bookmakerHeader}>
					<div className={s.bookmakerDetails}>
						<img src={bookmaker.image ? apiURL + bookmaker.image : contentImg} alt="bookmaker-img" />
						<a href={bookmaker.link} className={s.siteLink} target="_blank">
							{/* <FontAwesomeIcon icon={checkedIcon} className={checkedClass} /> */}
							<p><span>Перейти на</span> сайт</p>
						</a>
					</div>
					{/* <LikesBlock id={bookmaker.id} likes={23} elementType={'bookmaker'} /> */}
				</div>
				{/* <img src={contentImg} alt="content-img" className={s.contentImg} /> */}
			</div>

			<div className={s.bookmakerStats}>
				<div className={s.statBlock}>
					<p>Рейтинг</p>
					<p className={s.splitter}></p>
					<p>
						<span className={getBookmakerStatsClass(bookmaker.rating)}>{(+bookmaker.rating).toFixed(2)}</span>
						<span>/10</span>
					</p>
				</div>
				{/* <div className={s.statBlock}>
					<p>Коэффициент</p>
					<p className={s.splitter}></p>
					<p>
						<span className={getBookmakerStatsClass(8.35)}>8.35</span>
						<span>/10</span>
					</p>
				</div>
				<div className={s.statBlock}>
					<p>Линия</p>
					<p className={s.splitter}></p>
					<p>
						<span className={getBookmakerStatsClass(8.35)}>8.35</span>
						<span>/10</span>
					</p>
				</div>
				<div className={s.statBlock}>
					<p>Надежность</p>
					<p className={s.splitter}></p>
					<p>
						<span className={getBookmakerStatsClass(8.35)}>8.35</span>
						<span>/10</span>
					</p>
				</div>
				<div className={s.statBlock}>
					<p>Платежные системы</p>
					<p className={s.splitter}></p>
					<p>
						<span className={getBookmakerStatsClass(8.35)}>8.35</span>
						<span>/10</span>
					</p>
				</div> */}
				<div className={classNames(s.statBlock, s.bonus)}>
					<p>Бонус</p>
					<p className={s.splitter}></p>
					<p>
						{bookmaker.bonus && bookmaker.bonus.toLocaleString()}
						<span><FontAwesomeIcon icon={faRubleSign} /></span>
					</p>
				</div>
			</div>

			<div className={s.bookmakerText}>
				<p>{bookmaker.content}</p>
			</div>
			{/* <CommentsBlock comments={[]} /> */}
		</div >
	)
}
export default Bookmaker;