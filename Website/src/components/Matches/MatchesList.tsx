import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector} from "react-redux"
import { Link } from 'react-router-dom'
import s from './Matches.module.scss';
import classNames from 'classnames'
import { MatchType } from '../../types/matches'
import { AppStateType, SportType } from '../../types/types'
import footballImg from '../../assets/img/football.png'
import { MatchesPlaceholder } from '../Common/Placeholders/MatchesPlaceholder'
import moment from 'moment'
import { getSportImg } from '../../utils/getSportImg';
type MatchesListPropsType = {
	matches: Array<MatchType>
	limit?: number
	isMainpage?: boolean
}

export const getDateDay = (dateStr: string) => {
	let date = Date.parse(dateStr)
	let dateFormated = moment.unix(date / 1000).format("DD.MM.YYYY")

	let currentDate = moment.unix(Date.now() / 1000).format("DD.MM.YYYY")

	if (currentDate === dateFormated) return 'Сегодня'
	else return dateFormated
}
export const getDateTime = (dateStr: string) => {
	let date = Date.parse(dateStr)
	return moment.unix(date / 1000).format("HH:mm")
}



const UsersList: FC<MatchesListPropsType> = ({ matches, limit = 0, isMainpage = false, ...props }) => {
	const isFetching = useSelector<AppStateType, boolean>(state => state.matches.isFetching)
	const sports = useSelector<AppStateType, Array<SportType>>(state => state.app.sports)

	return (
		<div className={classNames(s.matchList, {[s.isMainpage]: isMainpage }) }>
			<div className={s.listHeader}>
				<div className={s.date}>Дата <span>и время</span></div>
				<div className={s.sportImg}></div>
				<div className={s.matchInfo}>Матч</div>
				<div className={s.betValue}>Ставки</div>
			</div>


			{matches.map((match, counter) =>
				(counter < limit || limit === 0) &&
				(isFetching ? <MatchesPlaceholder /> :
				match.event_id &&
				<div className={s.match}>
					<div className={s.date}>
						<p className={s.dateDay}>{getDateDay(match.event_start)}</p>
						<p className={s.dateTime}>{getDateTime(match.event_start)}</p>
					</div>
						<div className={s.sportImg}>
						<img src={ "http://betting-hub.sixhands.co/" + match.championship_data.sport_image} alt="sport-img" />
					</div>
					<Link to={`/matches/${match.event_id}`} className={s.matchInfo}>
							<p className={s.matchName}>{match.event}</p>
							<p className={s.tournamentName}>{match.championship_data.championship}</p>
						</Link>
						
						<div className={classNames(s.betValue, { [s.positive]: match.forecasts_count > 0 })}>
							{match.forecasts_count > 0 && "+"}
							{match.forecasts_count}
						</div>
				</div>)
			)}

		</div>
	)
}
export default UsersList;