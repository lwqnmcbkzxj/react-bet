import React, { FC, useState, useEffect } from 'react';
import s from './User.module.scss';
import classNames from 'classnames'
import { UserType } from '../../types/users'

import { FiltersObjectType, FilterNames } from '../../types/filters'
import { ForecastType } from '../../types/forecasts';

import { UserType as LoggedUserType } from '../../types/me'
import { toggleAuthFormVisiblility } from '../../redux/app-reducer'

import { Link } from 'react-router-dom'
import userNoImg from '../../assets/img/user-no-image.png'
import ForecastsList from '../Forecasts/ForecastsList/ForecastsList';
import UserStats from './UserStats'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';

export enum selectors {
	forecasts = 'forecasts',
	statistics = 'statistics',
	favourites = 'favourites',
}

type UsersPropsType = {
	user: UserType
	logged: boolean
	loggedUser: LoggedUserType
	isLoggedUserProfile: boolean

	forecasts: Array<ForecastType>
	getUserForecasts: () => void
	getUserFavourites: () => void

	subscribe: (id: number) => void

	filters: FiltersObjectType
	toggleFilter: (filterName: FilterNames, filtersBlockName: string) => void

	visibleTab: string
	changeVisibleTab: (tabName: string) => void
}


const User: FC<UsersPropsType> = ({
	user, logged, loggedUser, isLoggedUserProfile,
	forecasts, getUserForecasts, getUserFavourites,
	subscribe,
	filters, toggleFilter,
	visibleTab, changeVisibleTab,
	...props }) => {
		const dispatch = useDispatch()
	
	const [subscribed, setSubscribed] = useState(false)
	const subscribeToggle = (id: number) => {
		if (!logged) {
			dispatch(toggleAuthFormVisiblility())
			return 0
		} else {
			setSubscribed(!subscribed)
			subscribe(id)
		}
	}
	const [subBtnHovered, setSubscribedBtnHovered] = useState(false)
	const [subBtnHoverCounter, setSubBtnHoverCounter] = useState(0)

	const handleTabChange = (tabName: string) => {
		changeVisibleTab(tabName)
		if (tabName === selectors.forecasts) {
			getUserForecasts()
		} else if (tabName === selectors.favourites) {
			getUserFavourites()
		}
	}

	let renderingTab
	if (user.id) {
		if (visibleTab === selectors.forecasts) {
			renderingTab = <ForecastsList forecasts={forecasts} />
		} else if (visibleTab === selectors.statistics) {
			renderingTab =
				<UserStats
					stats={user.stats}
					filters={filters}
					toggleFilter={toggleFilter} />

		} else if (visibleTab === selectors.favourites) {
			renderingTab = <ForecastsList forecasts={forecasts} />
		}
	}




	let profileBtn
	if (user.id) {
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
				let icon
				let subBtnText
				if (subBtnHovered && subBtnHoverCounter > 0) {
					icon = <FontAwesomeIcon icon={faTimes} className={s.checkedIcon + ' ' + s.negative} />
					subBtnText = 'Отписаться'
				} else {
					icon = <FontAwesomeIcon icon={faCheck} className={s.checkedIcon + ' ' + s.positive} />
					subBtnText = 'Подписан'
				}

				// profileBtn =
				// 	<button
				// 		className={classNames(s.profileBtn, s.subscribe)}
				// 		onClick={() => { subscribeToggle(user.id) }}
				// 		onMouseEnter={(e) => { setSubscribedBtnHovered(true); setSubBtnHoverCounter(subBtnHoverCounter + 1);  }}
				// 		onMouseLeave={(e) => { setSubscribedBtnHovered(false); }}>
				// 		{icon}
				// 		<p>{subBtnText}</p>
				// 	</button>
			} else {
				// profileBtn =
				// 	<button className={classNames(s.profileBtn, s.subscribe)} onClick={() => { subscribeToggle(user.id); setSubBtnHoverCounter(0);}}>
				// 		<span>+</span> <p>Подписаться</p>
				// 	</button>
			}
		}
	}

	let ROIBlock = <></>
	if (user.id) {
		ROIBlock =
			<div className={s.roi}>
				{+user.stats.roi >= 0 ?
					<><span className={classNames(s.positive)}>+{(+user.stats.roi).toFixed(2)}%</span> ROI </> :
					<><span className={classNames(s.negative)}>-{(+user.stats.roi).toFixed(2)}%</span> ROI</>}
			</div>
	}

	return (
		user.id ?
			<div className={classNames(s.userPage)}>
				<div className={s.user}>
					<div className={s.userInfo}>
						<div className={s.userDetails}>
							<img src={user.avatar ? 'http://xbethub.com/' + user.avatar : userNoImg} alt="user-img" />
							<div className={s.nickName}>
								<p>{user.login}</p>
								<div className={s.userStats}>
									<p className={s.positive}>{user.stats.count_win}</p>/
									<p className={s.negative}>{user.stats.count_loss}</p>/
									<p className={s.neutral}>{user.stats.count_back}</p>
								</div>
							</div>

							{profileBtn}

							<div className={s.userBalance}>
								<p className={s.bank}><span>Банк:</span> {((+user.balance).toFixed(2).toLocaleString())}xB</p>
								{ROIBlock}
							</div>
							<div className={s.mobileRoi}>
								{ROIBlock}
							</div>
						</div>
					</div>

					<div className={s.userStats}>
						<div className={s.subscribers}>
							<p>Подписчиков</p>
							<p>{user.stats.count_subscribers}</p>
						</div>
						<div className={s.place}>
							<p>Место</p>
							<p className={classNames({ [s.positive]: user.rating_position <= 15, [s.neutral]: user.rating_position > 15 })}>{user.rating_position}</p>
							{/* Предположительно зеленый, когда меньше 15 */}
						</div>
						<div className={s.porfit}>
							<p>Чист. прибыль</p>
							<p className={classNames({
								[s.positive]: (+user.stats.pure_profit) > 0,
								[s.negative]: (+user.stats.pure_profit) < 0
							})}>{(+user.stats.pure_profit).toFixed(2)}</p>
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
			</div> : <div></div>
	)
}
export default User;