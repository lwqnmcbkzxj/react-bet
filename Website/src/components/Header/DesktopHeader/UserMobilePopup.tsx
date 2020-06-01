import React, { FC, useState, useEffect, createRef } from 'react';
import { useDispatch } from 'react-redux';

import s from './Header.module.scss';
import classNames from 'classnames'
import { NavLink, Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBookmark, faCog, faDoorClosed } from '@fortawesome/free-solid-svg-icons'

import exitIcon from '../../../assets/img/exit-icon.png'
import bookmarkIcon from '../../../assets/img/popup-bookmark-icon.png'
import plusIcon from '../../../assets/img/plus-icon.png'

import { changeUserPageActiveTab } from '../../../redux/app-reducer'
import { UserType as LoggedUserType } from '../../../types/me'
import userImgPlaceholder from '../../../assets/img/user-no-image.png'
import { apiURL } from '../../../api/api';

type UserPopupPropsType = {
	logout: () => void
	loggedUser: LoggedUserType
	toggleUserPopupVisibility: (value?: boolean | any) => void
}

const UserMobilePopup: FC<UserPopupPropsType> = ({ logout, loggedUser, toggleUserPopupVisibility, ...props }) => {
	const dispatch = useDispatch()
	let popupRef = createRef<HTMLDivElement>()
	useEffect(() => {
		window.addEventListener('click', (e) => {
			// toggleUserPopupVisibility(false)
		})
		return (
			window.removeEventListener('click', () => { })
		)
	}, [])

	return (
		<div className={s.userPopup} ref={popupRef}>
			<div className={s.popupHeader}>Профиль</div>

			<NavLink to={`/forecasters/${loggedUser.id}`} className={s.popupRow + ' ' + s.userRow} onClick={toggleUserPopupVisibility}>
				<img src={loggedUser.avatar ? apiURL + loggedUser.avatar : userImgPlaceholder} alt="user-img" />
				<p>{loggedUser.login}</p>
			</NavLink>

			<NavLink
				to={`/forecasters/${loggedUser.id}`}
				className={s.popupRow}
				onClick={() => { dispatch(changeUserPageActiveTab('favourites')); toggleUserPopupVisibility() }}>

				<img src={bookmarkIcon} alt="fav-icon" />
				<p>Избранное</p>
			</NavLink>

			<NavLink to={`/forecasts/add/forecast`} className={s.popupRow} onClick={toggleUserPopupVisibility}>
				<img src={plusIcon} alt="plus-icon" />
				<p>Добавить прогноз</p>
			</NavLink>
			<NavLink to={`/forecasts/add/express`} className={s.popupRow} onClick={toggleUserPopupVisibility}>
				<img src={plusIcon} alt="plus-icon" />
				<p>Добавить экспресс</p>
			</NavLink>
			{loggedUser.role_id > 2 &&
				<NavLink to={`/admin`} className={s.popupRow} onClick={toggleUserPopupVisibility}>
					<img src={plusIcon} alt="plus-icon" />
					<p>Админка</p>
				</NavLink>
			}


			<Link to="/" className={s.popupRow + ' ' + s.logoutRow} onClick={() => { logout(); toggleUserPopupVisibility() }}>
				<img src={exitIcon} alt="door-img" />
				<p>Выйти</p>
			</Link>
		</div>
	)
}

export default UserMobilePopup;