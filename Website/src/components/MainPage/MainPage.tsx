import React, { FC } from 'react';
import s from './MainPage.module.css';
import { NavLink } from 'react-router-dom';
import ForecastsList from '../Forecasts/ForecastsList/ForecastsList'
import ActionButton from '../Common/ActionButton/ActionButton'
import { ForecastType } from '../../types/types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

type MainPagePropsType = {
	forecasts: Array<ForecastType>
}

const MainPage: FC<MainPagePropsType> = ({ forecasts, ...props }) => {

	const toggleBlock = () => {
		console.log('TOGGLING')
	}

	return (
		<div className="">
			<div className={s.forecasters}>
				<h1 className={s.blockHeader}>Лучшие прогнозисты</h1>
				<p>Здесь будет список прогнозистов</p>
				<NavLink to="/forecasters" className={s.navLinkBtn}><ActionButton value="Посмотреть всех" /></NavLink>

			</div>

			<div className={s.forecasts}>
				<h1 className={s.blockHeader}>Последние прогнозы</h1>
				<ForecastsList forecasts={forecasts} limit={5} />
				<NavLink to="/forecasts" className={s.navLinkBtn}><ActionButton value="Все прогнозы" /></NavLink>
			</div>

			<div className={s.bookMakers}>
				<div className={s.contentBlock}>
					<div className={s.contentBlockHeader}>
						<h1>Рейтинг букмекеров</h1>
						<button className={s.toggleButton} onClick={toggleBlock}><FontAwesomeIcon icon={faCaretDown} /></button>
					</div>

					<p>Список букмекеров</p>

				</div>
				<NavLink to="/bookmakers" className={s.navLinkBtn}><ActionButton value="Посмотреть всех" /></NavLink>
			</div>

			<div className={s.matches}>
				<div className={s.contentBlock}>
					<div className={s.contentBlockHeader}>
						<h1>Рейтинг букмекеров</h1>
					</div>
					<p>Список матчей</p>
				</div>
				<NavLink to="/matches" className={s.navLinkBtn}><ActionButton value="Показать дальше" /></NavLink>
			</div>
		</div>
	)
}

export default MainPage;