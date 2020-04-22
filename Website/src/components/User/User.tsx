import React, { FC, useState } from 'react';
import s from './User.module.scss';
import classNames from 'classnames'
import '../../App.scss'
import { UserType } from '../../types/users'

import userImg from '../../assets/img/users-list-img.png'
import ForecastsList from '../Forecasts/ForecastsList/ForecastsList';
import UserStats from './UserStats'

enum selectors {
	forecasts = 'forecasts',
	statistics = 'statistics',
	favourites = 'favourites',
}

type UsersPropsType = {
	user: UserType
}
const User: FC<UsersPropsType> = ({ user, ...props }) => {
	const [visibleTab, setVisibleTab] = useState('statistics')
	const changeVisibleTab = (tabName: string) => {
		if (visibleTab !== tabName)
			setVisibleTab(tabName)
	}

	let renderingTab 
	if (visibleTab === 'forecasts') {
		// renderingTab = <ForecastsList />
	} else if (visibleTab === 'statistics') {
		renderingTab = <UserStats wins={10} loses={5} returns={2} />
	} else if (visibleTab === 'forecfavouritesasts') {
		// renderingTab = <ForecastsList />
	}
	return (
		<div className={s.userPage}>
			<div className={s.user}>
				<div className={s.userInfo}>
					<div className={s.userDetails}>
						<img src={userImg} alt="user-img" />
						<div className={s.rightBlock}>
							<div className={s.nickName}>Никнейм</div>
							<div className={s.userBalance}>
								<p className={s.bank}><span>Банк:</span> 166 500xB</p>
								<p className={s.roi}>
									<span className={classNames({ [s.positive]: true, [s.negative]: false })}>+128.5%</span>
									ROI за все время</p>
							</div>
						</div>
					</div>
					<button className={s.subscribeBtn}><span>+</span> Подписаться</button>
				</div>

				<div className={s.userStats}>
					<div className={s.wins}>
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
					</div>
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
							onChange={() => { changeVisibleTab(selectors.forecasts) }} />
						<label htmlFor={selectors.forecasts}>Прогнозы</label>
					</div>
					<div className={s.selector}>
						<input
							type="radio"
							name={'userListSelector'}
							id={selectors.statistics}
							onChange={() => { changeVisibleTab(selectors.statistics) }} />
						<label htmlFor={selectors.statistics}>Статистика</label>
					</div>
					<div className={s.selector}>
						<input
							type="radio"
							name={'userListSelector'}
							id={selectors.favourites}
							onChange={() => { changeVisibleTab(selectors.favourites) }} />
						<label htmlFor={selectors.favourites}>Избранное</label>
					</div>


				</div>
			</div>	
			

			<div className={s.infoBlock}>
				{renderingTab}
			</div>
		</div>
	)
}
export default User;