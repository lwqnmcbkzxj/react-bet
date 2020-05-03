import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector} from "react-redux"
import { NavLink } from 'react-router-dom'
import s from './Users.module.scss';
import classNames from 'classnames'
import { UserType } from '../../types/users'
import { AppStateType } from '../../types/types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { UsersPlaceholder } from '../Common/Placeholders/UsersPlaceholder'
import userImg from '../../assets/img/users-list-img.png'

type UsersListPropsType = {
	users: Array<UserType>
	limit?: number
}
const UsersList: FC<UsersListPropsType> = ({ users, limit = 0, ...props }) => {
	const isFetching = useSelector<AppStateType, boolean>(state => state.users.isFetching)

	
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
				isFetching ? <UsersPlaceholder /> : 
				<div className={s.user}>
					<div className={s.position}>
						<FontAwesomeIcon icon={faCaretUp} className={classNames(s.positionIcon, {
							[s.positive]: true,
							[s.negative]: false
						})} />
						<span>{counter + 1}</span>
					</div>
					<NavLink to="/forecasters/5" className={s.nickName}>
						<img src={userImg} alt="user-img" />
						<p>Никнейм (0)</p>
					</NavLink>
					<div className={s.averageCoef}>1.67</div>
					<div className={s.matchesStats}>
						<span className={s.wins}>10</span>
						<div className={s.slash}>/</div>
						<span className={s.loses}>2</span>
						<div className={s.slash}>/</div>
						<span className={s.draws}>0</span>
					</div>


					<div className={classNames(s.roiCoef, {
						[s.positive]: true,
						[s.negative]: false
					})}>+122.48</div>

					<div className={classNames(s.profilt, {
						[s.positive]: true,
						[s.negative]: false
					})}>+124%</div>
				</div>
			)}

		</div>
	)
}
export default UsersList;