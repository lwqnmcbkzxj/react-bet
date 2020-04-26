import React, { FC } from 'react';
import s from './ForecastsList.module.scss';
import classNames from 'classnames'
import { ForecastType } from '../../../types/forecasts'

import ForecastStats from '../../Forecast/ForecastElements/ForecastStats'
import forecastUserImg from '../../../assets/img/forecast-img.png'
import { NavLink, Link } from 'react-router-dom';

import winImg from '../../../assets/img/win-img.png'
import loseImg from '../../../assets/img/lose-img.png'

import { getSportImg } from '../../../utils/getSportImg';
import moment from 'moment'

type ForecastPropsType = {
	forecast: ForecastType
}
const serverUrl = "http://xbethub.com/"

const formatDateForForecastListElement = (createdAt: string) => {
	let createdDate = Date.parse(createdAt)
	let momentFormat = moment.unix(createdDate / 1000)
	let now = Date.now()

	let startDate = ''
	if ((now - createdDate ) / 86400 < 1) {
		startDate = 'Сегодня, ' + momentFormat.format("HH:MM")
	} else if ((now - createdDate) / 86400 < 2) {
		startDate = 'Вчера, '  + momentFormat.format("HH:MM")
	} else {
		startDate = momentFormat.format("DD.MM.YYYY в HH:MM")
	}

	return startDate
}




const Forecasts: FC<ForecastPropsType> = ({ forecast, ...props }) => {
	let fullGameName = forecast.Tournament
	let gameName = fullGameName.split('.')[1] + '.' + fullGameName.split('.')[2]


	let sportImg = getSportImg(forecast.SportName)
	
	

	return (
		<div className={s.forecast}>
			<div className={s.forecastHeader}>
				<div className={s.gameInfo}>
					<img src={sportImg} alt="gameImg" />
					<Link to={`forecasts/${forecast.ForecastId}`}><p className={s.sportName}>{forecast.SportName}. </p></Link>
					<Link to={`forecasts/${forecast.ForecastId}`}><p className={s.gameName}>{gameName}</p></Link>
				</div>
				<div className={s.matchDate}>
						{formatDateForForecastListElement(forecast.CratedAt)}
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
					<Link to={`forecasts/${forecast.ForecastId}`}><div className={s.matchTitle}>{forecast.Text}</div></Link>
				</div>
				<div className={s.matchStats}>
					<div className={s.profitStats}>
						<Link to={`forecast${forecast.ForecastId}`} className={s.profitStat}><div>Прогноз: <span>Фора (-1.5)</span></div></Link>
						<Link to={`forecast${forecast.ForecastId}`} className={s.profitStat}><div>Коэффициент: <span>{forecast.Coefficient}</span></div></Link>
						<Link to={`forecast${forecast.ForecastId}`} className={s.profitStat}><div>Сумма ставки: <span>{forecast.BetValue}</span></div></Link>
					</div>
					<div className={s.matchStart}>Начало игры: -</div>
				</div>
				<div className={s.matchDescription}>
					<NavLink to={`/forecasts/${forecast.ForecastId}`}>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing
						elit, sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Bibendum est ultricies integer quis.
						Iaculis urna id volutpat lacus laoreet. Mauris vitae
						ultricies leo integer malesuada.
					Ac odio tempor orci dapibus ultrices</p>
					</NavLink>
				</div>
			</div>


			<div className={s.forecastFooter}>
				<div className={s.userStats}>
					<NavLink to="/forecasters/5" className={s.userInfo}>
						<img src={serverUrl + forecast.UserAvatar} alt="userImg" />
						<p className={s.userNickName}>{forecast.UserName}</p>
					</NavLink>
					<div className={s.userMatches}>
						<div className={s.slash}>|</div>
						<img src={winImg} alt="winImg" />
						<img src={loseImg} alt="loseImg" />
						<img src={winImg} alt="winImg" />
						<img src={winImg} alt="winImg" />
						<img src={loseImg} alt="loseImg" />
						<div className={s.slash}>|</div>

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

				<ForecastStats
					comments={forecast.CommentsQuanity}
					favourites={forecast.FavAmmount}
					likes={forecast.Rating}
					forecastId={forecast.ForecastId} />
			</div>
		</div>
	)
}
export default Forecasts;