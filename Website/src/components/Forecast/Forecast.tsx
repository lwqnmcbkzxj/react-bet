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
import { NavLink } from 'react-router-dom';
import { getSportImg } from '../../utils/getSportImg';
import GoBackBlock from '../Common/GoBackBlock/GoBackBlock'
import ElementStats from '../Common/ElementStats/ElementStats'

import moment from 'moment'
import CommentsBlock from '../Common/CommentsBlock/CommentsBlock';

type ForecastPropsType = {
	forecast: ForecastType
}


const formatDateForForecastPage = (createdAt: string) => {
	let createdDate = Date.parse(createdAt)
	return moment.unix(createdDate / 1000).format("DD.MM.YYYY в HH:MM")
}




const Forecast: FC<ForecastPropsType> = ({ forecast, ...props }) => { 
	debugger
	let sportImg = ""
	let teams = ['', '']
	let userAvatar = ""
	let userRoi = 0

	let title = forecast.forecast_text
	// TO DO на forecast.title

	if (forecast.id) {
		sportImg = getSportImg(forecast.sport_id)
		teams = title.split(' - ')
		userAvatar = forecast.user_data.avatar
		if (userAvatar) {
			userAvatar = 'http://xbethub.com/' + userAvatar
		} else {
			userAvatar = ''
		}
	
		userRoi = +forecast.user_data.stats.roi
	}
	
	return (
		 <div className={s.forecast}>
			<GoBackBlock
				link={'forecasts'}
				linkText={'Прогнозы'}
				icon={faBookmark}
				func={() => {console.log('s')}}
			/>

			<Breadcrumbs pathParams={['Главная', 'Прогнозы', `${title} тотал больше 1.5`]} />

			<div className={s.forecastHeader}>
				<div className={s.headerDetails}>
					<div className={s.disciplineName}>{""}</div>
					{/* TO DO */}
					<div className={s.matchDate}>{formatDateForForecastPage(forecast.created_at)}</div>
				</div>
				<div className={s.forecastName}>{title} тотал больше 1.5</div>
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
					<p>{formatDateForForecastPage(forecast.start)}</p>
				</div>
				<div className={s.details_forecast}>
					<p>Прогноз</p>
					<p className={s.splitter}></p>
					<p>Тотал больше 1.5</p>
				</div>
				<div>
					<p>Коэффициент</p>
					<p className={s.splitter}></p>
					{/* TO DO */}
					{/* <p>{forecast.Coefficient}</p> */}
				</div>
				<div className={s.details_cash}>
					<p>Ставка</p>
					<p className={s.splitter}></p>
					<p>{forecast.bet}
						<span><FontAwesomeIcon icon={faRubleSign} /></span>
					</p>
				</div>
				<div className={s.details_cash}>
					<p>Чистая прибыль</p>
					<p className={s.splitter}></p>
					{/* TO DO */}

					{/* <p>{(forecast.bet * forecast.Coefficient - forecast.bet).toFixed(2)}
						<span><FontAwesomeIcon icon={faRubleSign} /></span>
					</p> */}
				</div>
			</div>


			<div className={s.userBlock}>
				<div className={s.userInfo}>
					<img src={userAvatar} alt="forecastUserImg" />
					<div className={s.userDetails}>
						<p className={s.userNickName}>{forecast.user_data.login}</p>
						<p className={s.mobileUserProfit}>Прибыль:
								{+userRoi < 0 ? 
								<span className={classNames(s.mobileUserProfit, s.positive)}>+{userRoi}%</span> :
								<span className={classNames(s.mobileUserProfit, s.negative)}>-{userRoi}%</span> }
						</p>
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
						{+userRoi < 0 ? 
								<p className={s.positive}>+{userRoi}</p> :
								<p className={s.negative}>-{userRoi}</p> }

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

			<ElementStats
				comments={forecast.count_comments}
				favourites={0}
				// favourites={forecast.FavAmmount}
				// likes={forecast.Rating}
				likes={forecast.count_likes - forecast.count_dislikes}
				id={forecast.id}
				elementType={'forecast'} />

			
			<CommentsBlock />
		</div>
	)
}
export default Forecast;