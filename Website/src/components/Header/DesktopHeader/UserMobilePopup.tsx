import React, { FC, useState } from 'react';
import s from './Header.module.scss';
import classNames from 'classnames'
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBookmark, faCog, faDoorClosed } from '@fortawesome/free-solid-svg-icons'
import doorImg from '../../../assets/img/door.png'
import { selectors } from '../../User/User';



type UserPopupPropsType = {
	logout: () => void
	loggedUserId: number
	toggleUserPopupVisibility: () => void
}

const UserMobilePopup: FC<UserPopupPropsType> = ({ logout, loggedUserId, toggleUserPopupVisibility, ...props }) => {

	return (
		<div className={s.userPopup} onClick={toggleUserPopupVisibility}>
			{/* <Link to={`/forecasters/${loggedUserId}`} className={s.popupRow} >
				<FontAwesomeIcon icon={faBookmark} className={s.icon}/>
				<p>Избранное</p>
			</Link> */}
			<Link to={`/forecasters/${loggedUserId}/settings`} className={s.popupRow}>
				<FontAwesomeIcon icon={faCog} className={s.icon}/>
				<p>Настройки</p>
			</Link>
			<button className={s.popupRow} onClick={logout}>
				<img src={doorImg} alt="door-img"/>
				<p>Выйти</p>
			</button>
		</div>
	)
}

export default UserMobilePopup;