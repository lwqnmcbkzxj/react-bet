import React, { FC, useEffect, useState } from 'react';
import s from './Header.module.scss';
import { NavLink, Link } from 'react-router-dom';

import userImgPlaceholder from '../../../assets/img/user-no-image.png'

import logo from '../../../assets/img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import UserMobilePopup from './UserMobilePopup'
import Search from './Search'
import LiveBtn from '../LiveBtn/LiveBtn';
import { UserType } from '../../../types/me';

type HeaderPropsType = {
	logged: boolean
	logout: () => void

	user: UserType

	isCommentsBlockVisible: boolean
	toggleAuthFormVisiblility: () => void
	toggleCommentsBlockVisibility: () => void
}

const DesktopHeader: FC<HeaderPropsType> = ({ logged, logout, user, isCommentsBlockVisible, toggleAuthFormVisiblility, toggleCommentsBlockVisibility, ...props }) => {
	const [popupVisible, setPopupVisibility] = useState(false)
	
	const toggleUserPopupVisibility = (value?: boolean | any) => {

		if (value === true || value === false) 
			setPopupVisibility(value)
		else 
			setPopupVisibility(!popupVisible)
	}
	
	


	let authedBlock
	if (logged) {
		authedBlock =
			<div className={s.headerUserBlock}>
			<div className={s.bankBlock}>Банк: <span>
				{user.balance ? (+user.balance).toLocaleString() : 0} xB</span></div>
			<div className={s.loggedUser}>
				
					<Link to={`/forecasters/${user.id}`} onClick={(e) => { if (user.id === 0) e.preventDefault() }} >
						<img src={user.avatar ? user.avatar : userImgPlaceholder} alt="user-img" />
					</Link>
					<button className={s.userBlockToggler} onClick={toggleUserPopupVisibility}>
						<FontAwesomeIcon icon={faCaretDown} />
					</button>
				{logged && popupVisible &&
					<UserMobilePopup
						logout={logout}
						loggedUserId={user.id}
						toggleUserPopupVisibility={toggleUserPopupVisibility}
					/>}

				</div>
			</div>
	} else {
		authedBlock = (
			<div className={s.headerUserBlock}>
				<div></div>
				<button className={s.loginBtn} onClick={toggleAuthFormVisiblility}>
					<FontAwesomeIcon icon={faUser} className={s.loginIcon} />
					<span>Войти</span>
				</button>
			</div>)

	}


	return (
		<div className={s.desktopHeader}>
			<div className={s.advert}></div>
			<header>
				<NavLink to="/" className={s.logoLink}><img src={logo} className={s.logo} alt="logo" /></NavLink>
				<Search />

				{authedBlock}

				{isCommentsBlockVisible && <LiveBtn toggleCommentsBlockVisibility={toggleCommentsBlockVisibility} />}

			</header>
		</div>
	)
}

export default DesktopHeader;