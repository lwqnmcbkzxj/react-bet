import React, { FC } from 'react';
import s from './ForecastStats.module.css';
import classNames from 'classnames'
import { ForecastType } from '../../../types/types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faBookmark as faBookmarkFill} from '@fortawesome/free-solid-svg-icons'
import { faCommentAlt, faBookmark, } from '@fortawesome/free-regular-svg-icons'


type ForecastStatsPropsType = {
	comments: number
	likes: number
	favourites: number
}
const ForecastDetails: FC<ForecastStatsPropsType> = ({ comments, likes, favourites, ...props }) => {
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
					{ favouritesButton }
					<span>{favourites}</span>
				</div>
			</div>
			<div className={s.likes}>
				<button><FontAwesomeIcon icon={faChevronDown} /></button>
				<span className={classNames(
					{
						[s.positive]: true,
						[s.negative]: false,
					}
				)}>{likes}</span>
				<button><FontAwesomeIcon icon={faChevronUp} /></button>

			</div>
		</div>
	)
}
export default ForecastDetails;