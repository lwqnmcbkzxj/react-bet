import React, { FC, useState } from 'react';
import s from './Match.module.scss';
import classNames from 'classnames'
import { } from '../../types/forecasts'
import Breadcrumbs from '../Common/Breadcrumbs/Breadcrumbs'
import BetsList from './BetsList'
import { MatchType } from '../../types/matches';
import CommentsBlock from '../Common/CommentsBlock/CommentsBlock';
import MatchChart from './MatchChart'
import { getSportImg } from '../../utils/getSportImg';


type MatchPropsType = {
	match: MatchType
}
const Match: FC<MatchPropsType> = ({ match, ...props }) => {
	let sportImg = getSportImg('Футбол')
	return (
		<div className={s.match}>
			<Breadcrumbs pathParams={['Главная', 'Лучшие матчи', 'Mousesports - Virtus.pro']} />

			<div className={s.matchStats}>
				<div className={s.team}>
					<img src={false ? 'abcc' : sportImg} alt="" />
					<div className={s.teamName}>Mousesports</div>
				</div>
				<div className={s.statsInfo}>
					<div className={s.hours}>19:00</div>
					<div className={s.date}>26/07/2020</div>
					<div className={s.tournament}>LPL Pro League Season 4</div>
					<div className={s.timeBeforeStart}>1ч : 35м : 34с</div>
				</div>
				<div className={s.team}>
					<img src={false ? 'abcc' : sportImg} alt="" />
					<div className={s.teamName}>Mousesports</div>
				</div>
			</div>


			<div className={s.betsBlock}>
				<div className={s.betsTitle}>Топ ставки</div>
				<div className={s.betsChart}>
					<MatchChart />
				</div>
				<div className={s.betsTable}>
					<div className={s.tableHeader}>
						<div className={s.forecaster}>Прогнозист</div>
						<div className={s.betType}>Ставка</div>
						<div className={s.passability}>Проходимость</div>
						<div className={s.profit}>Прибыль</div>
					</div>

					<BetsList bets={[{},{},{},{},{}]}/>
				</div>
			</div>

			<CommentsBlock comments={[{}]} />
		</div>
	)
}
export default Match;