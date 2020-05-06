import React, { FC, useState } from 'react';
import s from './Match.module.scss';
import classNames from 'classnames'
import { } from '../../types/forecasts'

import { MatchType } from '../../types/matches';

import userImg from '../../assets/img/user-img.png'

type BetsListPropsType = {
	bets: Array<any>
}
const BetsList: FC<BetsListPropsType> = ({ bets, ...props }) => {
	return (
		<div className={s.betsList}>
			{bets.map(bet =>
				<div className={s.bet}>
					<div className={s.forecaster}>
						<img src={userImg} alt="user-img" />
						<div className={s.userName}>Никнейм</div>
					</div>
					<div className={s.betType}>П2</div>
					<div className={classNames(s.passability, { [s.positive]: true })}>67%</div>
					<div className={s.profit}>+124%</div>
				</div>
			)}
		</div>
	)
}
export default BetsList;