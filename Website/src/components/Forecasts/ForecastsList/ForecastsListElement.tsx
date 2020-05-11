import React, { FC } from 'react';
import s from './ForecastsList.module.scss';
import classNames from 'classnames'
import { ForecastType } from '../../../types/forecasts'

import ElementStats from '../../Common/ElementStats/ElementStats'
import forecastUserImg from '../../../assets/img/forecast-img.png'
import { NavLink, Link } from 'react-router-dom';

import winImg from '../../../assets/img/win-img.png'
import loseImg from '../../../assets/img/lose-img.png'

import { getSportImg } from '../../../utils/getSportImg';
import moment from 'moment'


import { ForecastsListElementPlaceholder } from '../../Common/Placeholders/ForecastsPlaceholder'


type ForecastPropsType = {
	forecast: ForecastType
	isFetching: boolean
}

const formatDateForForecastListElement = (createdAt: string) => {
	let createdDate = Date.parse(createdAt)
	let momentFormat = moment.unix(createdDate / 1000)
	let now = Date.now()

	let startDate = ''
	if ((now - createdDate) / 86400 < 1) {
		startDate = 'Сегодня, ' + momentFormat.format("HH:MM")
	} else if ((now - createdDate) / 86400 < 2) {
		startDate = 'Вчера, ' + momentFormat.format("HH:MM")
	} else {
		startDate = momentFormat.format("DD.MM.YYYY в HH:MM")
	}

	return startDate
}


const Forecasts: FC<ForecastPropsType> = ({ forecast, isFetching, ...props }) => {
	let fullGameName
	let gameName
	let sportImg = getSportImg(forecast.sport_id)

	// if (forecast.Tournament) {
	// 	fullGameName = forecast.Tournament
	// 	gameName = fullGameName.split('.').splice(1).join('.')

	// 	// const serverUrl = "http://xbethub.com/"		
	// }

	let userAvatar 
	if (forecast.user_data.avatar) {
		userAvatar = 'http://xbethub.com/' + forecast.user_data.avatar
	} else {
		userAvatar = ''
	}
	
	if (isFetching) {
		return <ForecastsListElementPlaceholder />
	}

	return (
		<div className={s.forecast}>
			<div className={s.forecastHeader}>
				<div className={s.gameInfo}>
					<img src={sportImg} alt="gameImg" />
					<Link to={`forecasts/${forecast.id}`}><p className={s.sportName}>{forecast.sport_id}. </p></Link>
					<Link to={`forecasts/${forecast.id}`}><p className={s.gameName}>{gameName}</p></Link>
				</div>
				<div className={s.matchDate}>
					{formatDateForForecastListElement(forecast.created_at)}
				</div>
			</div>

			<div className={s.forecastContent}>

				<div className={s.mathPreview}>
					{forecast.id % 2 === 0 ?
						<div className={classNames(s.profit, s.positive)}>+750 xB</div> :
						<div className={classNames(s.profit, s.negative)}>-750 xB</div>}
					<Link to={`forecasts/${forecast.id}`}><div className={s.matchTitle}>{forecast.title}</div></Link>
				</div>

				<div className={s.matchStats}>
					<div className={s.profitStats}>
						<Link to={`forecast${forecast.id}`} className={s.profitStat}><div>Прогноз: <span>Фора (-1.5)</span></div></Link>
						<Link to={`forecast${forecast.id}`} className={s.profitStat}><div>Коэффициент: <span>
							{/* {forecast.Coefficient} */}
							{0}
							{/* TO DO */}
						</span></div></Link>
						<Link to={`forecast${forecast.id}`} className={s.profitStat}><div>Сумма ставки: <span>{forecast.bet}</span></div></Link>
					</div>
					<div className={s.matchStart}>Начало игры: {formatDateForForecastListElement(forecast.start)}</div>

				</div>
				<div className={s.matchDescription}>
					<NavLink to={`/forecasts/${forecast.id}`}>
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
					<NavLink to={`/forecasters/${forecast.user_data.id}`} className={s.userInfo}>
						<img src={userAvatar} alt="userImg" />
						<p className={s.userNickName}>{forecast.user_data.login}</p>
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

				<ElementStats
					comments={forecast.count_comments}
					// favourites={forecast.FavAmmount}
					favourites={0}
					likes={forecast.count_likes - forecast.count_dislikes}
					id={forecast.id}
					elementType={'forecast'} />

			</div>
		</div>
	)
}
export default Forecasts;