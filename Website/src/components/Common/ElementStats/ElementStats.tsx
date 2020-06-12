import React, { FC, useState, useEffect } from 'react';
import s from './ElementStats.module.scss';
import classNames from 'classnames'
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from '../../../types/types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faBookmark as faBookmarkFill } from '@fortawesome/free-solid-svg-icons'
import { faCommentAlt, faBookmark, } from '@fortawesome/free-regular-svg-icons'
import { rateForecast, favouriteForecast } from '../../../redux/forecasts-reducer'
import { toggleAuthFormVisiblility } from '../../../redux/app-reducer'
import LikesBlock from './LikesBlock';


type ElementStatsPropsType = {
	comments: number
	likes: number
	favourites: number

	showLikes?: boolean
	showFavourites?: boolean
	showComments?: boolean

	showFavCount?:boolean

	likesActive?: null | string
	favouritesActive?: boolean

	id: number
	elementType: string
}
const ElementStats: FC<ElementStatsPropsType> = ({
	comments, likes, favourites,
	showLikes = true, showFavourites = true, showComments = true,
	showFavCount = true,
	likesActive = "", favouritesActive = false,
	id, elementType, ...props }) => {

	const logged = useSelector<AppStateType, boolean>(state => state.me.logged)
	const dispatch = useDispatch()

	const favouriteDispatch = (id: number) => {
		if (elementType === 'forecast')
			dispatch(favouriteForecast(id))
	}

	const [isFavourite, setFavourite] = useState(favouritesActive)
	const [favouriteCount, setFavouriteCount] = useState(favourites)


	useEffect(() => {
		if (isFavourite !== favouritesActive)
		toggleFavourite()
	}, [favouritesActive])

	const toggleFavourite = (id?: number) => {
		if (!logged) {
			dispatch(toggleAuthFormVisiblility())
			return 0
		}
		if (isFavourite)
			setFavouriteCount(favouriteCount - 1)
		else
			setFavouriteCount(favouriteCount + 1)

		setFavourite(!isFavourite)
		if (id)
			favouriteDispatch(id)
	}



	let favouritesButton
	if (isFavourite) {
		favouritesButton = <button className={s.active} onClick={() => { toggleFavourite(id) }}><FontAwesomeIcon icon={faBookmarkFill} /></button>
	} else {
		favouritesButton = <button onClick={() => { toggleFavourite(id) }}><FontAwesomeIcon icon={faBookmark} /></button>
	}

	return (
		<div className={classNames(s.elementStats, {[s.noPadding]: !showFavCount})}>
			<div className={s.leftBlock}>
				{showComments && <div className={s.comments}>
					<FontAwesomeIcon icon={faCommentAlt} />
					<span className={comments === 0 ? s.hidden : ""}>{comments}</span>
				</div>}
				{showFavourites && <div className={classNames(s.favourites, {[s.noPadding]: !showFavCount})}>
					{favouritesButton}
					<span className={favouriteCount === 0 ? s.hidden : ""}>{favouriteCount}</span>
				</div>}
			</div>
			{showLikes && <LikesBlock id={id} likes={likes} elementType={elementType} likesActive={likesActive} />}
		</div>
	)
}
export default ElementStats;