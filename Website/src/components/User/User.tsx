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
import { apiURL } from '../../api/api';
import SubscribeButton from '../Common/SubscibeButton/SubscribeButton';
import BorderedSelectors from '../Common/Selectors/BorderedSelector/BorderedSelector';
import { getUserImg } from '../../utils/getUserImg';

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

	filters: FiltersObjectType
	toggleFilter: (filterName: FilterNames, filtersBlockName: string) => void

	visibleTab: string
	changeVisibleTab: (tabName: string) => void
}


const User: FC<UsersPropsType> = ({
	user, logged, loggedUser, isLoggedUserProfile,
	forecasts, getUserForecasts, getUserFavourites,
	filters, toggleFilter,
	visibleTab, changeVisibleTab,
	...props }) => {
		const dispatch = useDispatch()
	
	useEffect(() => {
		if (!isLoggedUserProfile)
			handleTabChange(selectors.forecasts)
	}, []);
	



	const handleTabChange = (tabName: string) => {
		changeVisibleTab(tabName)
		
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
			profileBtn =
			<SubscribeButton
				userId={user.id}
				isSubscribed={user.is_subscribed}
			/>
		}
	}

	let ROIBlock = <></>
	if (user.id) {
		ROIBlock =
			<div className={s.roi}>
				{+user.stats.roi >= 0 ?
					<><span className={classNames(s.positive)}>+{(+user.stats.roi * 100).toFixed(2)}%</span> ROI </> :
					<><span className={classNames(s.negative)}>{(+user.stats.roi * 100).toFixed(2)}%</span> ROI</>}
			</div>
	}

	return (
		user.id ?
			<div className={classNames(s.userPage)}>
				<div className={s.user}>
					<div className={s.userInfo}>
						<div className={s.userDetails}>
							<img src={getUserImg(user.avatar)} alt="user-img" />
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

					<BorderedSelectors
						listName="userListSelector"
						initialValue={visibleTab}
						changeVisibleTab={handleTabChange}
						selectors={[
							{ name: selectors.forecasts, text: "Прогнозы" },
							{ name: selectors.statistics, text: "Статистика" },
							{ name: selectors.favourites, text: "Избранное", condition: isLoggedUserProfile }
						]}
					/>
				</div>

				<div className={s.infoBlock}>
					{renderingTab}
				</div>
			</div> : <div></div>
	)
}
export default User;