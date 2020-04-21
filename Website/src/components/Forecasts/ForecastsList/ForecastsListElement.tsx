import React, { FC } from 'react';
import s from './ForecastsList.module.scss';
import classNames from 'classnames'
import { ForecastType } from '../../../types/forecasts'

import ForecastStats from '../../Forecast/ForecastElements/ForecastStats'
import football from '../../../assets/img/football.png'
import forecastUserImg from '../../../assets/img/forecast-img.png'
import { NavLink } from 'react-router-dom';


type ForecastPropsType = {
	forecast: ForecastType
}
const Forecasts: FC<ForecastPropsType> = ({ forecast, ...props }) => {
	return (
		<div className={s.forecast}>
			<div className={s.forecastHeader}>
				<div className={s.gameInfo}>
					<img src={football} alt="gameImg" />
					<p className={s.sportName}>Киберспорт. </p>
					<p className={s.gameName}>Dota 2. </p>
					<p className={s.tournamentName}>StayHome Challenge (матчи из 3-х карт)</p>
				</div>
				<div className={s.matchDate}>
					Сегодня, 19:06
				</div>
			</div>

			<div className={s.forecastContent}>
				<div className={s.mathPreview}>
					<div className={classNames(s.profit,
						{
							[s.positive]: true,
							[s.negative]: false,
						}
					)}>+750 xB</div>
					<NavLink to={`forecasts/${forecast.ForecastId}`}><div className={s.matchTitle}>FlyToMoon - Team Unique</div></NavLink>
				</div>
				<div className={s.matchStats}>
					<div className={s.profitStats}>
						<div>Прогноз: <span>Фора (-1.5)</span></div>
						<div>Коэффициент: <span>2.02</span></div>
						<div>Сумма ставки: <span>550</span></div>
					</div>
					<div className={s.matchStart}>Начало игры: -</div>
				</div>
				<div className={s.matchDescription}>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing
					elit, sed do eiusmod tempor incididunt ut labore et dolore
					magna aliqua. Bibendum est ultricies integer quis.
					Iaculis urna id volutpat lacus laoreet. Mauris vitae
					ultricies leo integer malesuada.
					Ac odio tempor orci dapibus ultrices</p>
				</div>
			</div>



			<div className={s.forecastFooter}>
				<div className={s.userStats}>
					<div className={s.userInfo}>
						<img src={forecastUserImg} alt="userImg" />
						<p className={s.userNickName}>Никнейм</p>
						<div className={s.slash}>|</div>

					</div>
					<div className={s.userMatches}>
						<img src="" alt="" />
						<img src="" alt="" />
						<img src="" alt="" />
						<img src="" alt="" />
						<img src="" alt="" />
					</div>
					<div className={s.userProfit}>
						<p>Прибыль: </p>
						<span className={classNames(
							{
								[s.positive]: true,
								[s.negative]: false,
							}
						)}>+50.4%</span>
					</div>

				</div>
				
				<ForecastStats comments={3} favourites={54} likes={23}/>
			</div>
		</div>
	)
}
export default Forecasts;