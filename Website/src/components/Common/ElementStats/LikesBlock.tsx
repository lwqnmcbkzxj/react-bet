import React, { FC, useState, useEffect, createRef } from 'react';
import s from './ElementStats.module.scss';
import classNames from 'classnames'
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from '../../../types/types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faBookmark as faBookmarkFill } from '@fortawesome/free-solid-svg-icons'
import { toggleAuthFormVisiblility } from '../../../redux/app-reducer'

import { rateForecast } from '../../../redux/forecasts-reducer'
import { ratePost } from '../../../redux/articles-reducer'
import { rateComment } from '../../../redux/comments-reducer'

type LikesBlockPropsType = {
	likes: number
	id: number
	elementType: string

	likesActive?: null | string
}
const LikesBlock: FC<LikesBlockPropsType> = ({ likes, id, elementType, likesActive, ...props }) => {
	const logged = useSelector<AppStateType, boolean>(state => state.me.logged)
	const dispatch = useDispatch()
	// Like - 1, dislike - 2
	const rateDispatch = (id: number, rateType: number) => {
		if (elementType === 'forecast')
			dispatch(rateForecast(id, rateType))
		else if (elementType === 'comment') {
			dispatch(rateComment(id, rateType))
		} else if (elementType === 'article') {
			dispatch(ratePost(id, rateType))
		}
	}
	
	const [likingInProgress, setLikingInProgress] = useState(false)
	// Получение ISLIKED
	const [elementLiked, setLiked] = useState(likesActive === 'like')
	const [elementDisliked, setDisliked] = useState(likesActive === 'dislike')
	const [likesCount, setLikesCountHook] = useState(likes)

	const [likesArray, setLikesArray] = useState([likesCount + 1, +likesCount, likesCount - 1])
	const [likesBlockStyle, setLikesBlockStyle] = useState({})
	const setLikesCount = (likes: number) => {
		let transition = 300
		let likesDiff = likes - likesCount
		// Sliding array
		if (likesDiff < 0)
			setLikesBlockStyle({ marginTop: -58, transition: transition / 1000 + 's' })
		else
			setLikesBlockStyle({ marginTop: 58, transition: transition / 1000 + 's' })

		likesDiff = Math.abs(likesDiff)
		setLikesArray([likesCount + likesDiff, likesCount, likesCount - likesDiff])

		// After 0.3s changing numbers and removing margin
		setLikingInProgress(true)
		setTimeout(() => {
			setLikesCountHook(likes)
			setLikesArray([likes + 1, likes, likes - 1])
			setLikesBlockStyle({})
			setLikingInProgress(false)

		}, transition);
	}

	useEffect(() => {
		setLikesCountHook(likes)
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

	return (
		<div className={classNames(s.likes)}>
			<button
				onClick={() => { dislikeElement(id) }}
				className={classNames({ [s.negative]: elementDisliked })}
				disabled={likingInProgress}
			><FontAwesomeIcon icon={faChevronDown} /></button>

			<div className={s.likesCountBlock} style={{ ...likesBlockStyle }}>
				{likesArray.map((number, counter) =>
					<div
						key={counter}
						className={classNames(
							s.likesNumber, {
							[s.positive]: number > 0,
							[s.negative]: number < 0,
						})}>{number}
					</div>
				)}
			</div>

			<button
				className={classNames({ [s.positive]: elementLiked })}
				onClick={() => { likeElement(id) }}
				disabled={likingInProgress}
			><FontAwesomeIcon icon={faChevronUp} /></button>
		</div>
	)
}
export default LikesBlock;