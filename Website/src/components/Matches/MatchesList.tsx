import React, { FC } from 'react';
import { NavLink } from 'react-router-dom'
import s from './Matches.module.scss';
import classNames from 'classnames'
// import { MatchType } from '../../types/matches'

import footballImg from '../../assets/img/football.png'

type UsersListPropsType = {
	// matches: Array<MatchType>
	limit?: number
	isMainpage?: boolean
}
const UsersList: FC<UsersListPropsType> = ({ limit = 0, isMainpage = false, ...props }) => {
	let matches = [{}, {}, {}, {}, {},{}, {}, {}, {}, {},{}, {}, {}, {}, {},]
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
				<div className={s.match}>
					<div className={s.date}>
						<p className={s.dateDay}>Сегодня</p>
						<p className={s.dateTime}>16:40</p>
					</div>
					<div className={s.sportImg}>
						<img src={footballImg} alt="sport-img"/>				
					</div>
					<div className={s.matchInfo}>
						<p className={s.matchName}>Mousesports - Virtus.pro</p>
						<p className={s.tournamentName}>LPL Pro League Season 4</p>
					</div>
					<div className={classNames(s.betValue, {[s.positive]: true})}>+122</div>
				</div>
			)}

		</div>
	)
}
export default UsersList;