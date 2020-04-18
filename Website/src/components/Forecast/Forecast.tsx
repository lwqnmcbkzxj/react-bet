import React, { FC } from 'react';
import s from './Forecast.module.css';
import classNames from 'classnames'
import Breadcrumbs from '../Common/Breadcrumbs/Breadcrumbs'

import ForecastStats from './ForecastElements/ForecastStats'
import footballImg from '../../assets/img/football.png'
// import forecastUserImg from '../../assets/img/forecast-user-img.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRubleSign } from '@fortawesome/free-solid-svg-icons'

type ForecastPropsType = {

}
const Forecast: FC<ForecastPropsType> = ({ ...props }) => {
	return (
		<div className={s.forecast}>
			<Breadcrumbs pathParams={['Главная', 'Прогнозы', 'Энергетик-БГУ тотал больше 1.5']} />

			<div className={s.forecastHeader}>
				<div className={s.headerDetails}>
					<div className={s.disciplineName}>Волейбол. NORCECA Women's Continental Championship</div>
					<div className={s.matchDate}>03.04.2020 в 12:03</div>
				</div>
				<div className={s.forecastName}>Энергетик-БГУ тотал больше 1.5</div>
			</div>
			
			<div className={s.teams}>
				<div className={s.team}>
					<img src={footballImg} alt="sportImg"/>
					<p>Команда 1</p>
				</div>
				<div className={s.vsBlock}>VS</div>
				<div className={s.team}>					
					<p>Команда 2</p>
					<img src={footballImg} alt="sportImg"/>
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
					<p>10.04.2020 в 12:40</p>
				</div>
				<div className={s.details_forecast}>
					<p>Прогноз</p>
					<p className={s.splitter}></p>
					<p>Тотал больше 1.5</p>
				</div>
				<div>
					<p>Коэффициент</p>
					<p className={s.splitter}></p>
					<p>1.78</p>
				</div>
				<div className={s.details_cash}>
					<p>Ставка</p>
					<p className={s.splitter}></p>
					<p>1 370
						<span><FontAwesomeIcon icon={faRubleSign} /></span>
					</p>
				</div>
				<div className={s.details_cash}>
					<p>Чистая прибыль</p>
					<p className={s.splitter}></p>
					<p>1 700 
						<span><FontAwesomeIcon icon={faRubleSign} /></span>
					</p>
				</div>
			</div>


			<div className={s.userBlock}>
				<div className={s.userInfo}>
					{/* <img src={forecastUserImg} alt="forecastUserImg" /> */}
					<p className={s.userNickName}>Никнейм</p>
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
			
			<ForecastStats comments={16} favourites={54} likes={23} />

			<div className={s.comments}>
				Forecast Comments
			</div>
		</div>
	)
}
export default Forecast;