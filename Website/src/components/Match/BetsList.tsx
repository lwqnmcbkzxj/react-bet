import React, { FC, useState } from 'react';
import s from './Match.module.scss';
import classNames from 'classnames'
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from '../../types/types'
import { MatchType } from '../../types/matches';
import { BetsListItemPlaceholder } from '../../components/Common/Placeholders/MatchesPlaceholder'
import userImg from '../../assets/img/user-img.png'

type BetsListPropsType = {
	bets: Array<any>
}
const BetsList: FC<BetsListPropsType> = ({ bets, ...props }) => {
	const isFetching = useSelector<AppStateType, boolean>(state => state.matches.isFetching)

	return (
		<div className={s.betsList}>
			<div className={s.tableHeader}>
				<div className={s.forecaster}>Прогнозист</div>
				<div className={s.betType}>Ставка</div>
				<div className={s.passability}>Проходимость</div>
				<div className={s.profit}>Прибыль</div>
			</div>

			{bets.map(bet =>
				isFetching ? <BetsListItemPlaceholder /> :
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