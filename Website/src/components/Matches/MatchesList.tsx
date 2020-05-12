import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector} from "react-redux"
import { Link } from 'react-router-dom'
import s from './Matches.module.scss';
import classNames from 'classnames'
import { MatchType } from '../../types/matches'
import { AppStateType } from '../../types/types'
import footballImg from '../../assets/img/football.png'
import { MatchesPlaceholder  } from '../Common/Placeholders/MatchesPlaceholder'
type MatchesListPropsType = {
	matches: Array<MatchType>
	limit?: number
	isMainpage?: boolean
}
const UsersList: FC<MatchesListPropsType> = ({ matches, limit = 0, isMainpage = false, ...props }) => {
	const isFetching = useSelector<AppStateType, boolean>(state => state.matches.isFetching)

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
				(isFetching ? <MatchesPlaceholder/> :
				<div className={s.match}>
					<div className={s.date}>
						<p className={s.dateDay}>Сегодня</p>
						<p className={s.dateTime}>16:40</p>
					</div>
					<div className={s.sportImg}>
						<img src={footballImg} alt="sport-img"/>				
					</div>
					<Link to="/matches/1" className={s.matchInfo}>
						<p className={s.matchName}>Mousesports - Virtus.pro</p>
						<p className={s.tournamentName}>LPL Pro League Season 4</p>
					</Link>
					<div className={classNames(s.betValue, {[s.positive]: true})}>+122</div>
				</div>)
			)}

		</div>
	)
}
export default UsersList;