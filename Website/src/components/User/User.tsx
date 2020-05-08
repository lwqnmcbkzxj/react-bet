import React, { FC, useState, useEffect } from 'react';
import s from './User.module.scss';
import classNames from 'classnames'
import { UserType } from '../../types/user'

import { FiltersObjectType, FilterNames } from '../../types/filters'
import { ForecastType } from '../../types/forecasts';

import { UserType as LoggedUserType } from '../../types/me'

import { Link } from 'react-router-dom'
import userNoImg from '../../assets/img/user-no-image.png'
import ForecastsList from '../Forecasts/ForecastsList/ForecastsList';
import UserStats from './UserStats'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faCheck } from '@fortawesome/free-solid-svg-icons'

export enum selectors {
	forecasts = 'forecasts',
	statistics = 'statistics',
	favourites = 'favourites',
}

type UsersPropsType = {
	user: UserType
	loggedUser: LoggedUserType
	isLoggedUserProfile: boolean

	forecasts: Array<ForecastType>
	getUserForecasts: () => void
	getUserFavourites: () => void

	subscribe: () => void

	filters: FiltersObjectType
	toggleFilter: (filterName: FilterNames, filtersBlockName: string) => void

	visibleTab: string
	changeVisibleTab: (tabName: string) => void
}


const User: FC<UsersPropsType> = ({
	user, loggedUser, isLoggedUserProfile,
	forecasts, getUserForecasts, getUserFavourites,
	subscribe,
	filters, toggleFilter,
	visibleTab, changeVisibleTab,
	...props }) => {

	const handleTabChange = (tabName: string) => {
		changeVisibleTab(tabName)
		if (tabName === selectors.forecasts) {
			getUserForecasts()
		} else if (tabName === selectors.favourites) {
			getUserFavourites()
		}
	}

	let renderingTab
	if (visibleTab === selectors.forecasts) {
		renderingTab = <ForecastsList forecasts={forecasts} />
	} else if (visibleTab === selectors.statistics) {
		renderingTab = <UserStats wins={10} loses={5} returns={2} filters={filters} toggleFilter={toggleFilter} />
	} else if (visibleTab === selectors.favourites) {
		renderingTab = <ForecastsList forecasts={forecasts} />
	}


	const [subscribed, setSubscribed] = useState(false)
	const subscribeToggle = () => {
		setSubscribed(!subscribed)
	}

		
		
	let profileBtn
	if (isLoggedUserProfile) {
		profileBtn =
			<Link to={`/forecasters/${loggedUser.id}/settings`}>
				<button className={classNames(s.profileBtn, s.settings)}>
					<span><FontAwesomeIcon icon={faCog} className={s.settingIcon} /></span>
					<p>Настройки</p>
				</button>
			</Link>
	} else {
		if (subscribed) {
			profileBtn =
				<button className={classNames(s.profileBtn, s.subscribe)} onClick={subscribeToggle}>
					<span>+</span> <p>Подписаться</p>
				</button>
		} else {
			profileBtn =
				<button className={classNames(s.profileBtn, s.subscribe)} onClick={subscribeToggle}>
				<FontAwesomeIcon icon={faCheck} className={s.checkedIcon + ' ' + s.positive}/>
					<p>Подписан</p>
				</button>
		}
	}


	let ROIBlock =
		<div className={s.roi}>
			<span className={classNames({ [s.positive]: true, [s.negative]: false })}>+128.5%</span>
			<div className={s.roiSplitter}>|</div>
			<span className={classNames({ [s.positive]: true, [s.negative]: false })}>+128.5%</span> ROI
		</div>






	return (
		<div className={classNames(s.userPage)}>
			<div className={s.user}>
				<div className={s.userInfo}>
					<div className={s.userDetails}>
						<img src={userNoImg} alt="user-img" />
						<div className={s.nickName}>
							<p>Никнейм</p>
								<div className={s.userStats}>
									<p className={s.positive}>10</p>/
									<p className={s.negative}>5</p>/
									<p className={s.neutral}>2</p>
								</div>
						</div>

						{profileBtn}

						<div className={s.userBalance}>
							<p className={s.bank}><span>Банк:</span> 166 500xB</p>
							{ROIBlock}
						</div>
						<div className={s.mobileRoi}>
							{ROIBlock}
						</div>
					</div>
				</div>

				<div className={s.userStats}>
					{/* <div className={s.wins}>
						<p>Побед</p>
						<p className={s.positive}>10</p>
					</div>
					<div className={s.loses}>
						<p>Поражений</p>
						<p className={s.negative}>5</p>
					</div>
					<div className={s.returns}>
						<p>Возвратов</p>
						<p className={s.neutral}>2</p>
					</div> */}
					<div className={s.subscribers}>
						<p>Подписчиков</p>
						<p>10</p>
					</div>
					<div className={s.place}>
						<p>Место</p>
						<p className={classNames({ [s.positive]: true, [s.negative]: false })}>3</p>
						{/* Предположительно зеленый, когда меньше 15 */}
					</div>
					<div className={s.porfit}>
						<p>Чист. прибыль</p>
						<p className={classNames({
							[s.positive]: true,
							[s.negative]: false
						})}>268%</p>
					</div>


				</div>

				<div className={s.userListsSelector}>
					<div className={s.selector}>
						<input
							type="radio"
							name={'userListSelector'}
							checked={visibleTab === selectors.forecasts}
							id={selectors.forecasts}
							onChange={() => { handleTabChange(selectors.forecasts) }} />
						<label htmlFor={selectors.forecasts}>Прогнозы</label>
					</div>
					<div className={s.selector}>
						<input
							type="radio"
							name={'userListSelector'}
							checked={visibleTab === selectors.statistics}
							id={selectors.statistics}
							onChange={() => { handleTabChange(selectors.statistics) }} />
						<label htmlFor={selectors.statistics}>Статистика</label>
					</div>

					{isLoggedUserProfile && <div className={s.selector}>
						<input
							type="radio"
							name={'userListSelector'}
							checked={visibleTab === selectors.favourites}
							id={selectors.favourites}
							onChange={() => { handleTabChange(selectors.favourites) }} />
						<label htmlFor={selectors.favourites}>Избранное</label>
					</div>}


				</div>
			</div>


			<div className={s.infoBlock}>
				{renderingTab}
			</div>
		</div>
	)
}
export default User;