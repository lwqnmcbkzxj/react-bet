import React, { FC } from 'react';
import s from './Header.module.scss';
import { NavLink } from 'react-router-dom';


import logo from '../../../assets/img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Search from './Search'
import LiveBtn from '../LiveBtn/LiveBtn';
type HeaderPropsType = {
	isCommentsBlockVisible: boolean
	toggleAuthFormVisiblility: () => void
	toggleCommentsBlockVisibility: () => void
}

const DesktopHeader: FC<HeaderPropsType> = ({ isCommentsBlockVisible, toggleAuthFormVisiblility, toggleCommentsBlockVisibility, ...props }) => {

	return (
		<div className={s.desktopHeader}>
			<div className={s.advert}></div>
				<header>
					<NavLink to="/" className={s.logoLink}><img src={logo} className={s.logo} alt="logo" /></NavLink>
					<Search />
					<button className={s.loginBtn} onClick={toggleAuthFormVisiblility}>
						<FontAwesomeIcon icon={faUser} className={s.loginIcon} />
						<span>Войти</span>
					</button>
					{isCommentsBlockVisible && <LiveBtn toggleCommentsBlockVisibility={toggleCommentsBlockVisibility} />}

				</header>
		</div>
	)
}

export default DesktopHeader;