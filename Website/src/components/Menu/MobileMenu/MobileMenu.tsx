import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from '../../../types/types'

import s from './MobileMenu.module.scss';
import classNames from 'classnames'
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faWifi, faPlusSquare, faUser, faBars } from '@fortawesome/free-solid-svg-icons'
import football_F from '../../../assets/img/football-field.png'
import trophy from '../../../assets/img/trophy.png'
import newspaper from '../../../assets/img/newspaper.png'
import { toggleAuthFormVisiblility, setShouldRedirect, setRedirectLink } from '../../../redux/app-reducer';



type MobileMenuPropsType = {
	loggedUserId:number
}

const MobileMenu: FC<MobileMenuPropsType> = ({ loggedUserId, ...props }) => {
	const logged = useSelector<AppStateType, boolean>(state => state.me.logged)
	const dispatch = useDispatch()



	const [menuBlocksVisible, setMenuBlocksVisibility] = useState(false);

	const toggleMenuBlocks = () => {
		dispatch(toggleAuthFormVisiblility(false))

		setMenuBlocksVisibility(!menuBlocksVisible)
	}
	const hideMenuBlocks = () => {
		setMenuBlocksVisibility(false)
	}
	let menuBarLinksActiveClass = "";
	if (!menuBlocksVisible)
		menuBarLinksActiveClass = classNames(s.active)

	const tryToLogin = (redirectLink: string) => {
		dispatch(toggleAuthFormVisiblility(true))

		dispatch(setRedirectLink(redirectLink))

		hideMenuBlocks()
	}

	let addForecastLink
	let profileLink
	if (logged) {
		profileLink = <NavLink exact to="/forecasts/add" className={s.menuLink} activeClassName={menuBarLinksActiveClass} onClick={hideMenuBlocks}>
			<FontAwesomeIcon icon={faPlusSquare} />
		</NavLink>
		addForecastLink = <NavLink to={`/forecasters/${loggedUserId}`} className={s.menuLink} activeClassName={menuBarLinksActiveClass} onClick={hideMenuBlocks}>
			<FontAwesomeIcon icon={faUser} />
		</NavLink>
	} else {
		profileLink = <button className={s.menuLink} onClick={() => {tryToLogin('/forecasts/add')}}><FontAwesomeIcon icon={faPlusSquare} /></button>
		addForecastLink = <button className={s.menuLink} onClick={() => {tryToLogin(`/forecasters/${loggedUserId}`)}}><FontAwesomeIcon icon={faUser} /></button>
	}


	return (
		<div className="">
			<div className={s.mobileMenu}>
				<NavLink exact to="/" className={s.menuLink} activeClassName={menuBarLinksActiveClass} onClick={hideMenuBlocks}>
					<FontAwesomeIcon icon={faHome} />
				</NavLink>
				<NavLink exact to="/forecasts" className={classNames(s.menuLink, s.rotateLink)} activeClassName={menuBarLinksActiveClass} onClick={hideMenuBlocks}>
					<FontAwesomeIcon icon={faWifi} />
				</NavLink>
				{profileLink}
				{addForecastLink}

				<button className={classNames(
					s.toggleMenuBtn,
					{ [s.active]: menuBlocksVisible }
				)} onClick={toggleMenuBlocks}><FontAwesomeIcon icon={faBars} />
				</button>
			</div>
			<div className={classNames(
				s.menuContent,
				{ [s.active]: menuBlocksVisible }
			)}>
				<div className={s.menuBlocks}>
					<NavLink to="/matches" onClick={toggleMenuBlocks} className={s.menuBlock}>
						<img src={football_F} alt="matches" />
						<p>Топ матчи</p>
					</NavLink>
					<NavLink to="/bookmakers" onClick={toggleMenuBlocks} className={s.menuBlock}>
						<img src={trophy} alt="bookmakers" />
						<p>Рейтинг букмекеров</p>
					</NavLink>
					<NavLink to="/forecasters" onClick={toggleMenuBlocks} className={s.menuBlock}>
						<img src={trophy} alt="forecasters" />
						<p>Рейтинг прогнозистов</p>
					</NavLink>
					<NavLink to="/news" onClick={toggleMenuBlocks} className={s.menuBlock}>
						<img src={newspaper} alt="news" />
						<p>Новости</p>
					</NavLink>
					<NavLink to="/articles" onClick={toggleMenuBlocks} className={s.menuBlock}>
						<img src={newspaper} alt="articles" />
						<p>Статьи</p>
					</NavLink>
				</div>

				<div className={s.menuContentBg}></div>
			</div>
		</div>
	)
}

export default MobileMenu;