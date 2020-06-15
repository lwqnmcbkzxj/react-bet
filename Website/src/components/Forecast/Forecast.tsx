import React, { FC } from 'react';
import s from './Forecast.module.scss';
import classNames from 'classnames'
import Breadcrumbs from '../Common/Breadcrumbs/Breadcrumbs'

import footballImg from '../../assets/img/football.png'
import forecastUserImg from '../../assets/img/forecast-img.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRubleSign, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faBookmark, } from '@fortawesome/free-regular-svg-icons'

import { ForecastType } from '../../types/forecasts';
import { Link } from 'react-router-dom';
import GoBackBlock from '../Common/GoBackBlock/GoBackBlock'
import ElementStats from '../Common/ElementStats/ElementStats'

import moment from 'moment'
import CommentsBlock from '../Common/CommentsBlock/CommentsBlock';
import userImgHolder from '../../assets/img/user-no-image.png'

import { apiURL } from '../../api/api'
import SubscribeButton from '../Common/SubscibeButton/SubscribeButton';
import { formatDate, formatStartDate } from '../../utils/formatDate'
import { getUserImg } from '../../utils/getUserImg';
import ExpressTable from '../Forecasts/ForecastsList/ExpressTable'


type ForecastPropsType = {
	forecast: ForecastType

	commentsFunctions: {
		refreshComments: () => void
		commentFilter: string
		setCommentFilter: (filterName: any) => void
	}
}

const Forecast: FC<ForecastPropsType> = ({ forecast, commentsFunctions, ...props }) => {
	let userRoi = 0

	let forecastTitle = ''
	let tournamentName = ''

	
	if (forecast.id) {

		userRoi = +(+forecast.user_data.stats.roi * 100).toFixed(2)
		forecastTitle = forecast.event_data.event + ' ' + forecast.bet_data.type

		if (forecast.event_data.championship_data.sport_id !== 5) {
			tournamentName = forecast.event_data.championship_data.championship.split('.').slice(1).join('.')
		} else {
			tournamentName = forecast.event_data.championship_data.championship
		}
	}

	let isExpress = +forecast.id === 4118

	return (
		<div className={s.forecast}>
			<GoBackBlock
				link={'forecasts'}
				linkText={'Прогнозы'}
				iconBlock={
					<ElementStats
						comments={0}
						likes={0}
						favourites={forecast.forecast_stats.count_subscribers}
						id={forecast.id}
						elementType={'forecast'}

						showComments={false}
						showLikes={false}

						showFavCount={false}
						favouritesActive={forecast.is_marked}
					/>
				}
			/>

			<Breadcrumbs pathParams={[
				{ text: 'Главная', link: '' },
				{ text: 'Прогнозы', link: '/forecasts' },
				{ text: `${forecastTitle}`, link: `/forecasts/${forecast.id}` }]} />

			<div className={s.forecastHeader}>
				<div className={s.headerDetails}>
					<div className={s.disciplineName}>{!isExpress && forecast.event_data.championship_data.sport_name}</div>
					<div className={s.matchDate}>{formatDate(forecast.forecast_created_at)}</div>
				</div>
				{!isExpress && <div className={s.forecastName}>{forecastTitle}</div>}
			</div>

			{!isExpress ? <div className={s.teams}>
				<div className={s.team}>
					<img src={apiURL + forecast.event_data.championship_data.sport_image} alt="teamImg" />
					<p>{forecast.event_data.team_1.name}</p>
				</div>
				<div className={s.vsBlock}>VS</div>
				<div className={s.team}>
					<p>{forecast.event_data.team_2.name}</p>
					<img src={apiURL + forecast.event_data.championship_data.sport_image} alt="teamImg" />
				</div>
			</div> : 
				<ExpressTable forecast={forecast}/>}

			<div className={s.forecastDetails}>
				{!isExpress && <div>
					<p>Турнир</p>
					<p className={s.splitter}></p>
					<p>{tournamentName}</p>
				</div>}
				<div>
					<p>Дата и время</p>
					<p className={s.splitter}></p>
					<p>{formatStartDate(forecast.event_data.event_start)}</p>
				</div>
				{!isExpress && <div className={s.details_forecast}>
					<p>Прогноз</p>
					<p className={s.splitter}></p>
					<p>{forecast.bet_data.type}</p>
				</div>}
				<div>
					<p>Коэффициент</p>
					<p className={s.splitter}></p>
					<p>{forecast.bet_data.coefficient}</p>
				</div>
				<div className={s.details_cash}>
					<p>Ставка</p>
					<p className={s.splitter}></p>
					<p>{forecast.bet_data.bet}
						<span><FontAwesomeIcon icon={faRubleSign} /></span>
					</p>
				</div>
				<div className={s.details_cash}>
					<p>Чистая прибыль</p>
					<p className={s.splitter}></p>
					<p>{(+forecast.bet_data.pure_profit * +forecast.bet_data.bet).toFixed(0)}
						<span><FontAwesomeIcon icon={faRubleSign} /></span>
					</p>
				</div>
			</div>


			<div className={s.userBlock}>
				<div className={s.userInfo}>
					<Link to={`/forecasters/${forecast.user_data.id}`}>
						<img src={getUserImg(forecast.user_data.avatar)} alt="forecastUserImg" />
					</Link>
					<div className={s.userDetails}>
						<Link to={`/forecasters/${forecast.user_data.id}`}>
							<p className={s.userNickName}>{forecast.user_data.login}</p>
						</Link>
						<p className={s.mobileUserProfit}>Прибыль:
								{+userRoi === 0 ? <span className={classNames(s.mobileUserProfit)}>{userRoi}</span> :
								+userRoi > 0 ? <span className={classNames(s.mobileUserProfit, s.positive)}>+{userRoi}%</span> :
									<span className={classNames(s.mobileUserProfit, s.negative)}>{userRoi}%</span>}
						</p>
					</div>
				</div>
				<div className={s.userStats}>
					<div className={s.statBlock}>
						<p>W/L/D</p>
						<p>
							<span className={s.wins}>{forecast.user_data.stats.count_win}</span>/
							<span className={s.loses}>{forecast.user_data.stats.count_loss}</span>/
							<span className={s.draws}>{forecast.user_data.stats.count_back}</span>
						</p>
					</div>
					<div className={s.statBlock}>
						<p>ROI, %</p>
						{
							<p className={classNames({
								[s.negative]: +userRoi < 0,
								[s.positive]: +userRoi > 0,
								[s.neutral]: +userRoi === 0,
							})}>
								{+userRoi > 0 ? "+" : ""}
								{userRoi}</p>
						}

					</div>
					<div className={s.statBlock}>
						<p>Ср. кф</p>
						<p>{(+forecast.user_data.stats.average_cofficient).toFixed(2)}</p>
					</div>
				</div>
				<SubscribeButton userId={forecast.user_data.id} responsive={false} isSubscribed={forecast.user_data.is_subscribed} />
			</div>

			<div className={s.forecastDescription}>
				<p>{forecast.forecast_text}</p>
			</div>

			
			
			<ElementStats
				comments={forecast.forecast_stats.count_comments}
				favourites={forecast.forecast_stats.count_subscribers}
				likes={forecast.forecast_stats.rating}
				id={forecast.id}
				elementType={'forecast'}

				likesActive={forecast.vote}
				favouritesActive={forecast.is_marked}
			/>
			<CommentsBlock
				comments={forecast.comments as any}
				elementId={forecast.id}
				type="forecasts"
				commentsFunctions={commentsFunctions}
			/>
		</div>
	)
}
export default Forecast;