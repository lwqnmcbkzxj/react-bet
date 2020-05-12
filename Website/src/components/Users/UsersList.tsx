import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from 'react-router-dom'
import s from './Users.module.scss';
import classNames from 'classnames'
import { UserType } from '../../types/users'
import { AppStateType } from '../../types/types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { UsersPlaceholder } from '../Common/Placeholders/UsersPlaceholder'
import userImgPlaceholder from '../../assets/img/user-no-image.png'

type UsersListPropsType = {
	users: Array<UserType>
	limit?: number
}
const UsersList: FC<UsersListPropsType> = ({ users, limit = 0, ...props }) => {
	const isFetching = useSelector<AppStateType, boolean>(state => state.users.isFetching)
	let serverUrl = 'http://xbethub.com/'

	return (
		<div className={s.userList}>
			<div className={s.listHeader}>
				<div className={s.position}>№</div>
				<div className={s.nickName}>Имя</div>
				<div className={s.averageCoef}>Ср.кф</div>
				<div className={s.matchesStats}>W/L/D</div>
				<div className={s.roiCoef}>ROI, %</div>
				<div className={s.profilt}>Прибыль</div>
			</div>


			{users.map((user, counter) =>
				(counter < limit || limit === 0) &&
					isFetching ? <UsersPlaceholder key={counter}/> :
					user.id && <div className={s.user} key={user.id}>
						<div className={s.position}>
							{(user.rating_position === 1 || user.rating_position === 2 || user.rating_position === 4) &&
								<FontAwesomeIcon icon={faCaretUp} className={classNames(s.positionIcon, {
								[s.positive]: true,
								[s.negative]: false
							})} />}
							<span>{counter + 1}</span>
						</div>
						<NavLink to={`/forecasters/${user.id}`} className={s.nickName}>
							<img src={user.avatar ? serverUrl + user.avatar : userImgPlaceholder} alt="user-img" />
							<p>{user.login}</p>
						</NavLink>
						<div className={s.averageCoef}>{user.stats.average_cofficient}</div>
						<div className={s.matchesStats}>
							<span className={s.wins}>{user.stats.count_win}</span>
							<div className={s.slash}>/</div>
							<span className={s.loses}>{user.stats.count_loss}</span>
							<div className={s.slash}>/</div>
							<span className={s.draws}>{user.stats.count_back}</span>
						</div>

						{+user.stats.roi > 0 ?
							<div className={classNames(s.roiCoef, s.positive)}>+{(+user.stats.roi).toFixed(2)}</div> :
							<div className={classNames(s.roiCoef, s.negative)}>-{(+user.stats.roi).toFixed(2)}</div>}
						{+user.stats.pure_profit > 0 ?
							<div className={classNames(s.profit, s.positive)}>+{(+user.stats.pure_profit)}</div> :
							<div className={classNames(s.profit, s.negative)}>-{(+user.stats.pure_profit)}</div>}

					</div>
			)}

		</div>
	)
}
export default UsersList;