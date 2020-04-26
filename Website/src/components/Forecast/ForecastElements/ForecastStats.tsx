import React, { FC, useState, useEffect } from 'react';
import s from './ForecastStats.module.scss';
import classNames from 'classnames'
import { useDispatch, useSelector } from "react-redux"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faBookmark as faBookmarkFill } from '@fortawesome/free-solid-svg-icons'
import { faCommentAlt, faBookmark, } from '@fortawesome/free-regular-svg-icons'
import { rateForecast } from '../../../redux/forecasts-reducer'

type ForecastStatsPropsType = {
	comments: number
	likes: number
	favourites: number
	forecastId: number
}
const ForecastDetails: FC<ForecastStatsPropsType> = ({ comments, likes, favourites, forecastId, ...props }) => {
	const dispatch = useDispatch()
	// Like - 1, dislike - 2
	const rateForecastDispatch = (id: number, rateType: number) => {
		dispatch(rateForecast(id, rateType))
	}

	// Получение ISLIKED
	const [forecastLiked, setLiked] = useState(false)
	const [forecastDisliked, setDisliked] = useState(false)
	const [likesCount, setLikesCount] = useState(likes)

	useEffect(() => {
		setLikesCount(likes)
	}, [likes]);

	const likeForecast = (id: number) => {
		if (forecastLiked) {
			// If liked - can click again and like will disapear
			setLikesCount(likesCount - 1)
			setLiked(false)
		} else {
			// if disliked - like gives + 2 rating
			if (forecastDisliked) {
				setLikesCount(likesCount + 2)
			} else {
				setLikesCount(likesCount + 1)
			}
			setLiked(true)
			setDisliked(false)
		}
		rateForecastDispatch(id, 1)
	}
	const dislikeForecast = (id: number) => {
		if (forecastDisliked) {
			
			setLikesCount(likesCount + 1)
			setDisliked(false)
		} else {
			if (forecastLiked) {
				setLikesCount(likesCount - 2)
			} else {
				setLikesCount(likesCount - 1)
			}

			setDisliked(true)
			setLiked(false)
		}
		rateForecastDispatch(id, 2)
	}






	let favouritesButton = <button><FontAwesomeIcon icon={faBookmark} /></button>
	if (true) {
		favouritesButton = <button className={s.active}><FontAwesomeIcon icon={faBookmarkFill} /></button>
	}

	return (
		<div className={s.forecastStats}>
			<div className={s.leftBlock}>
				<div className={s.comments}>
					<FontAwesomeIcon icon={faCommentAlt} />
					<span>{comments}</span>
				</div>
				<div className={s.favourites}>
					{favouritesButton}
					<span>{favourites}</span>
				</div>
			</div>
			<div className={s.likes}>
				<button
					onClick={() => { dislikeForecast(forecastId) }}
					className={classNames({[s.negative]: forecastDisliked})}
				><FontAwesomeIcon icon={faChevronDown} /></button>

				<span className={classNames({
					[s.positive]: likesCount > 0,
					[s.negative]: likesCount < 0,
				})}>{likesCount}</span>

				<button
					className={classNames({[s.positive]: forecastLiked})}
					onClick={() => { likeForecast(forecastId) }}
				><FontAwesomeIcon icon={faChevronUp} /></button>

			</div>
		</div>
	)
}
export default ForecastDetails;