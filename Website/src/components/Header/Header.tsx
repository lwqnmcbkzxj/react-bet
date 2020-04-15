import React, { FC } from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCaretLeft } from '@fortawesome/free-solid-svg-icons'

import Search from './Search'
type HeaderPropsType = {
	toggleAuthFormVisible: () => void
	toggleCommentsVisible: () => void
}

const Header: FC<HeaderPropsType> = ({ toggleAuthFormVisible, toggleCommentsVisible, ...props }) => {

	return (
		<header>
			<NavLink to="/"><img src={logo} className={s.logo} alt="logo" /></NavLink>
			<Search />
			<button className={s.loginBtn} onClick={toggleAuthFormVisible}>
				<FontAwesomeIcon icon={faUser} className={s.loginIcon} />
				<span>Войти</span>
			</button>
			<button className={s.commentsHeader} onClick={toggleCommentsVisible}>
				<FontAwesomeIcon icon={faCaretLeft} className={s.commentsIcon} />
				<p>Комментарии <span>LIVE</span></p>
			</button>
		</header>
	)
}

export default Header;