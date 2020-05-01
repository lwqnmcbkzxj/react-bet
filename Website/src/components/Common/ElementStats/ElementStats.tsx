import React, { FC, useState, useEffect } from 'react';
import s from './ElementStats.module.scss';
import classNames from 'classnames'
import { useDispatch, useSelector } from "react-redux"
import {AppStateType } from '../../../types/types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faBookmark as faBookmarkFill } from '@fortawesome/free-solid-svg-icons'
import { faCommentAlt, faBookmark, } from '@fortawesome/free-regular-svg-icons'
import { rateForecast, favouriteForecast } from '../../../redux/forecasts-reducer'
import { toggleAuthFormVisiblility } from '../../../redux/app-reducer' 


type ElementStatsPropsType = {
	comments: number
	likes: number
	favourites: number
	id: number
	elementType: string
}
const ElementStats: FC<ElementStatsPropsType> = ({ comments, likes, favourites, id, elementType, ...props }) => {
	const logged = useSelector<AppStateType, boolean>(state => state.me.logged)
	const dispatch = useDispatch()
	// Like - 1, dislike - 2
	const rateDispatch = (id: number, rateType: number) => {
		if (elementType === 'forecast')
			dispatch(rateForecast(id, rateType))
	}
	const favouriteDispatch = (id: number) => {
		if (elementType === 'forecast')
			dispatch(favouriteForecast(id))
	}

	// Получение ISLIKED
	const [elementLiked, setLiked] = useState(false)
	const [elementDisliked, setDisliked] = useState(false)
	const [likesCount, setLikesCount] = useState(likes)

	useEffect(() => {
		setLikesCount(likes)
	}, [likes]);

	const likeElement = (id: number) => {
		if (!logged) {
			dispatch(toggleAuthFormVisiblility())
			return 0
		}

		if (elementLiked) {
			// If liked - can click again and like will disapear
			setLikesCount(likesCount - 1)
			setLiked(false)
		} else {
			// if disliked - like gives + 2 rating
			if (elementDisliked) {
				setLikesCount(likesCount + 2)
			} else {
				setLikesCount(likesCount + 1)
			}
			setLiked(true)
			setDisliked(false)
		}
		rateDispatch(id, 1)
	}
	const dislikeElement = (id: number) => {
		if (!logged) {
			dispatch(toggleAuthFormVisiblility())
			return 0
		}

		if (elementDisliked) {			
			setLikesCount(likesCount + 1)
			setDisliked(false)
		} else {
			if (elementLiked) {
				setLikesCount(likesCount - 2)
			} else {
				setLikesCount(likesCount - 1)
			}

			setDisliked(true)
			setLiked(false)
		}
		rateDispatch(id, 2)
	}

	const [isFavourite, setFavourite] = useState(false)
	const [favouriteCount, setFavouriteCount] = useState(favourites)

	const toggleFavourite = (id: number) => {
		if (!logged) {
			dispatch(toggleAuthFormVisiblility())
			return 0
		}
		if (isFavourite)
			setFavouriteCount(favouriteCount - 1)
		else 
			setFavouriteCount(favouriteCount + 1)

		setFavourite(!isFavourite)
		favouriteDispatch(id)
	}





	let favouritesButton
	if (isFavourite) {
		favouritesButton = <button className={s.active} onClick={()=>{toggleFavourite(id)}}><FontAwesomeIcon icon={faBookmarkFill} /></button>
	} else {
		favouritesButton = <button onClick={()=>{toggleFavourite(id)}}><FontAwesomeIcon icon={faBookmark} /></button>
	}

	return (
		<div className={s.elementStats}>
			<div className={s.leftBlock}>
				<div className={s.comments}>
					<FontAwesomeIcon icon={faCommentAlt} />
					<span className={comments === 0 ? s.hidden : ""}>{comments}</span>
				</div>
				<div className={s.favourites}>
					{favouritesButton}
					<span className={favouriteCount === 0 ? s.hidden : ""}>{favouriteCount}</span>
				</div>
			</div>
			<div className={s.likes}>
				<button
					onClick={() => { dislikeElement(id) }}
					className={classNames({[s.negative]: elementDisliked})}
				><FontAwesomeIcon icon={faChevronDown} /></button>

				<span className={classNames({
					[s.positive]: likesCount > 0,
					[s.negative]: likesCount < 0,
				})}>{likesCount}</span>

				<button
					className={classNames({[s.positive]: elementLiked})}
					onClick={() => { likeElement(id) }}
				><FontAwesomeIcon icon={faChevronUp} /></button>

			</div>
		</div>
	)
}
export default ElementStats;