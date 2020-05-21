import React, { FC, useState } from 'react';
import s from './Match.module.scss';
import classNames from 'classnames'
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from '../../types/types'
import { ForecastType } from '../../types/forecasts';
import userNoImg from '../../assets/img/user-no-image.png'

type BetsListPropsType = {
	forecasts?: Array<ForecastType>
}
const BetsList: FC<BetsListPropsType> = ({ forecasts = [], ...props }) => {
	const getUserStatsColor = (value: number) => {
		if (value > 0) return s.positive
		if (value < 0)  return s.negative
	}
	const getUserStatsDigit = (value: number) => {
		if (value > 0) return '+'
		if (value < 0)  return '-'
	}
	return (
		<div className={s.betsList}>
			<div className={s.tableHeader}>
				<div className={s.forecaster}>Прогнозист</div>
				<div className={s.betType}>Ставка</div>
				<div className={s.passability}>Проходимость</div>
				<div className={s.profit}>Прибыль</div>
			</div>

			{forecasts.map((forecast, counter) =>
					<div className={s.bet} key={counter}>
						<div className={s.forecaster}>
							<img src={forecast.user_data.avatar ? 'http://xbethub.com/' + forecast.user_data.avatar : userNoImg} alt="user-img" />
							<div className={s.userName}>{forecast.user_data.login}</div>
						</div>
						<div className={s.betType}>{forecast.bet_data.type}</div>

						<div className={classNames(s.passability, getUserStatsColor(+forecast.user_data.stats.roi))}>
							{(+forecast.user_data.stats.roi  * 100).toFixed(2)}%
						</div>
						
						<div className={classNames(s.profit, getUserStatsColor(+forecast.user_data.stats.roi))}>
							{getUserStatsDigit(+forecast.user_data.stats.pure_profit)}
							{(+forecast.user_data.stats.pure_profit).toFixed(2)}
						</div>
						
					</div>
			)}
		</div>
	)
}
export default BetsList;