import React, { FC, useEffect } from 'react';
import s from './Header.module.scss';
import { NavLink, Link } from 'react-router-dom';

import userImg from '../../../assets/img/mainpage-users-img.png'

import logo from '../../../assets/img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons'

import Search from './Search'
import LiveBtn from '../LiveBtn/LiveBtn';
type HeaderPropsType = {
	logged: boolean
	logout: () => void
	loggedUserId: number

	isCommentsBlockVisible: boolean
	toggleAuthFormVisiblility: () => void
	toggleCommentsBlockVisibility: () => void
}

const DesktopHeader: FC<HeaderPropsType> = ({ logged, logout, loggedUserId, isCommentsBlockVisible, toggleAuthFormVisiblility, toggleCommentsBlockVisibility, ...props }) => {
	let authedBlock
	if (logged) {
		authedBlock =
			<div className={s.headerUserBlock}>
				<div className={s.bankBlock}>Банк: <span>1 500 xB</span></div>
				<div className={s.loggedUser}>
					<Link to={`/forecasters/${loggedUserId}`}>
						<img src={userImg} alt="user-img" />
					</Link>
					<button className={s.userBlockToggler} onClick={logout}>
						<FontAwesomeIcon icon={faCaretDown} />
					</button>
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