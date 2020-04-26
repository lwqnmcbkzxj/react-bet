import React, { FC } from 'react';
import s from './Forecast.module.scss';
import classNames from 'classnames'
import Breadcrumbs from '../Common/Breadcrumbs/Breadcrumbs'

import ForecastStats from './ForecastElements/ForecastStats'
import footballImg from '../../assets/img/football.png'
import forecastUserImg from '../../assets/img/forecast-img.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRubleSign, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faBookmark, } from '@fortawesome/free-regular-svg-icons'

import { ForecastType } from '../../types/forecasts';
import { NavLink } from 'react-router-dom';
import { getSportImg } from '../../utils/getSportImg';

import moment from 'moment'

type ForecastPropsType = {
	forecast: ForecastType
}


const formatDateForForecastPage = (createdAt: string) => {
	let createdDate = Date.parse(createdAt)
	return moment.unix(createdDate / 1000).format("DD.MM.YYYY в HH:MM")
}




const Forecast: FC<ForecastPropsType> = ({ forecast, ...props }) => {
	let sportImg = getSportImg(forecast.SportName)
	// let tournament = forecast.Tournament.split('.')
	let teams = ['','']
	if (forecast.Text) {
		teams = forecast.Text.split(' - ')
	}
	
	

	return (
		<div className={s.forecast}>
			<div className={s.goBackBlock}>
				<NavLink to="/forecasts" className={s.goBackPage}>
					<button className={s.goBackBtn}><FontAwesomeIcon icon={faArrowLeft}/></button>
					<p>Прогнозы</p>
				</NavLink>
				<button className={s.goBackBlockIcon}><FontAwesomeIcon icon={faBookmark}/></button>
			</div>

			<Breadcrumbs pathParams={['Главная', 'Прогнозы', `${forecast.Text} тотал больше 1.5`]} />

			<div className={s.forecastHeader}>
				<div className={s.headerDetails}>
					<div className={s.disciplineName}>{forecast.Tournament}</div>
					{/* <div className={s.matchDate}>03.04.2020 в 12:03</div> */}
					<div className={s.matchDate}>{formatDateForForecastPage(forecast.CratedAt)}</div>
				</div>
				<div className={s.forecastName}>{forecast.Text} тотал больше 1.5</div>
			</div>

			<div className={s.teams}>
				<div className={s.team}>
					<img src={sportImg} alt="sportImg" />
					<p>{teams[0]}</p>
				</div>
				<div className={s.vsBlock}>VS</div>
				<div className={s.team}>
					<p>{teams[1]}</p>
					<img src={sportImg} alt="sportImg" />
				</div>
			</div>

			<div className={s.forecastDetails}>
				<div>
					<p>Турнир</p>
					<p className={s.splitter}></p>
					<p>NORCECA WCC</p>
				</div>
				<div>
					<p>Дата и время</p>
					<p className={s.splitter}></p>
					<p>{formatDateForForecastPage(forecast.Time)}</p>
				</div>
				<div className={s.details_forecast}>
					<p>Прогноз</p>
					<p className={s.splitter}></p>
					<p>Тотал больше 1.5</p>
				</div>
				<div>
					<p>Коэффициент</p>
					<p className={s.splitter}></p>
					<p>{forecast.Coefficient}</p>
				</div>
				<div className={s.details_cash}>
					<p>Ставка</p>
					<p className={s.splitter}></p>
					<p>{forecast.BetValue}
						<span><FontAwesomeIcon icon={faRubleSign} /></span>
					</p>
				</div>
				<div className={s.details_cash}>
					<p>Чистая прибыль</p>
					<p className={s.splitter}></p>
					<p>{(forecast.BetValue * forecast.Coefficient - forecast.BetValue).toFixed(2)}
						<span><FontAwesomeIcon icon={faRubleSign} /></span>
					</p>
				</div>
			</div>


			<div className={s.userBlock}>
				<div className={s.userInfo}>
					{/* <img src={"http://xbethub.com/" + forecast.UserAvatar} alt="forecastUserImg" /> */}
					<div className={s.userDetails}>
						<p className={s.userNickName}>{forecast.UserName}</p>
						<p className={s.mobileUserProfit}>Прибыль: <span className={classNames(s.mobileUserProfit, { [s.positive]: true })}>+20%</span></p>
					</div>
				</div>
				<div className={s.userStats}>
					<div className={s.statBlock}>
						<p>W/L/D</p>
						<p>
							<span className={s.wins}>10</span>/
							<span className={s.loses}>2</span>/
							<span className={s.draws}>0</span>
						</p>
					</div>
					<div className={s.statBlock}>
						<p>ROI, %</p>
						<p className={classNames({
							[s.positive]: true,
							[s.negative]: false
						})}>+122.48</p>
					</div>
					<div className={s.statBlock}>
						<p>Ср. кф</p>
						<p>1.68</p>
					</div>
				</div>
				<button className={s.subscribeBtn}><span>+</span> Подписаться</button>
			</div>

			<div className={s.forecastDescription}>
				<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
				sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
				sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
				Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
				</p>
				<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
				sed diam nonumy eirmod tempor invidunt ut labore et dolore
				magna aliquyam erat, sed diam voluptua. At vero eos et
				accusam et justo duo dolores et ea rebum. Stet clita kasd
				gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
				</p>
				<p>	Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
				sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
				aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
				duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
				sanctus est Lorem ipsum dolor sit amet.
				</p>
			</div>

			<ForecastStats comments={0} favourites={forecast.FavAmmount} likes={forecast.Rating} forecastId={forecast.ForecastId}/>

			<div className={s.comments}>
				Forecast Comments
					{/* comments={forecast.comments} */}
			</div>
		</div>
	)
}
export default Forecast;