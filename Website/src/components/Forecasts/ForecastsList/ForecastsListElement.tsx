import React, { FC } from 'react';
import s from './ForecastsList.module.scss';
import classNames from 'classnames'
import { ForecastType } from '../../../types/forecasts'

import ElementStats from '../../Common/ElementStats/ElementStats'
import { NavLink, Link } from 'react-router-dom';

import winImg from '../../../assets/img/win-img.png'
import loseImg from '../../../assets/img/lose-img.png'
import userImgHolder from '../../../assets/img/user-no-image.png'

import { ForecastsListElementPlaceholder } from '../../Common/Placeholders/ForecastsPlaceholder'
import { formatDate } from '../../../utils/formatDate'

import { apiURL } from '../../../api/api'

type ForecastPropsType = {
	forecast: ForecastType
	isFetching: boolean
}

const Forecasts: FC<ForecastPropsType> = ({ forecast, isFetching, ...props }) => {
	let userAvatar = ''
	let tournamentName
	if (forecast.id) {

		if (forecast.user_data.avatar) {
			userAvatar = apiURL + forecast.user_data.avatar
		} else {
			userAvatar = userImgHolder
		}

		if (forecast.event_data.championship_data.sport_id !== 5) {
			tournamentName = forecast.event_data.championship_data.championship.split('.').slice(1).join('.')
		} else {
			tournamentName = forecast.event_data.championship_data.championship
		}
	}

	if (isFetching) {
		return <ForecastsListElementPlaceholder />
	}

	return (
		forecast.id ?
			<div className={s.forecast}>
				<div className={s.forecastHeader}>
					<div className={s.gameInfo}>
						<img src={apiURL + forecast.event_data.championship_data.sport_image} alt="gameImg" />
						<Link to={`/forecasts/${forecast.id}`}><p className={s.sportName}>{forecast.event_data.championship_data.sport_name}. </p></Link>
						<Link to={`/forecasts/${forecast.id}`}><p className={s.gameName} >{tournamentName}</p></Link>
					</div>
					<div className={s.matchDate}>
						{formatDate(forecast.forecast_created_at)}
					</div>
				</div>

				<div className={s.forecastContent}>
					<div className={s.mathPreview}>
						{forecast.bet_data.pure_profit > 0 ?
							<div className={classNames(s.profit, s.positive)}>+{(forecast.bet_data.pure_profit * +forecast.bet_data.bet).toFixed(2)} xB</div> :
							<div className={classNames(s.profit, s.negative)}>-{forecast.bet_data.pure_profit.toFixed(2)} xB</div>}
						<Link to={`/forecasts/${forecast.id}`}><div className={s.matchTitle}>{forecast.event_data.event}</div></Link>
					</div>

					<div className={s.matchStats}>
						<div className={s.profitStats}>
							<Link to={`/forecasts/${forecast.id}`} className={s.profitStat}><div>Прогноз: <span>{forecast.bet_data.type}</span></div></Link>
							<Link to={`/forecasts/${forecast.id}`} className={s.profitStat}>
								<div>Коэффициент: <span>{forecast.bet_data.coefficient}</span></div>
							</Link>
							<Link to={`/forecasts/${forecast.id}`} className={s.profitStat}><div>Сумма ставки: <span>{forecast.bet_data.bet}</span></div></Link>
						</div>
						<div className={s.matchStart}>Начало игры: {formatDate(forecast.event_data.event_start)}</div>
					</div>
					<div className={s.matchDescription}>
						<NavLink to={`/forecasts/${forecast.id}`}>
							<p>{forecast.forecast_text}</p>
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
							{forecast.user_data.last_five.map((predict, counter) =>
								predict ? <img src={winImg} alt="winImg" key={counter}/> : <img src={loseImg} alt="loseImg" key={counter}/>
							)}
							{forecast.user_data.last_five.length > 0 && <div className={s.slash}>|</div>}

						</div>
						<div className={s.userProfit}>
							<p>Прибыль: </p>

							{(+ forecast.user_data.stats.roi === 0) ?
								<span className={classNames(s.neutral)}>{(+forecast.user_data.stats.roi * 100).toFixed()}</span> :
								(+ forecast.user_data.stats.roi > 0) ?
								<span className={classNames(s.positive)}>+{(+forecast.user_data.stats.roi * 100).toFixed(1)}%</span> :
								<span className={classNames(s.negative)}>-{(+forecast.user_data.stats.roi * 100).toFixed(1)}%</span>
							}
						</div>
					</div>

					<ElementStats
						comments={forecast.forecast_stats.count_comments}
						favourites={forecast.forecast_stats.count_subscribers}
						likes={forecast.forecast_stats.rating}

						likesActive={forecast.vote}
						favouritesActive={forecast.is_marked}

						id={forecast.id}
						elementType={'forecast'} />

				</div>
			</div>

			: <div></div>
	)
}
export default Forecasts;