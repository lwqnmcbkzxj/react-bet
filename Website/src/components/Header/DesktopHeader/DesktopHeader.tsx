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
import { apiURL } from '../../../api/api';
import { getUserImg } from '../../../utils/getUserImg';
import { BannerPositionEnum, AppStateType, BannerType } from '../../../types/types';
import { Banner } from '../../Adverts/Banner';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

type HeaderPropsType = {
	logged: boolean
	logout: () => void

	user: UserType

	isCommentsBlockVisible: boolean
	toggleAuthFormVisiblility: () => void
	toggleCommentsBlockVisibility: () => void


	search: {
		searchText: string
		handleSearchTextChange: (searchText: string) => void
		handleSearch: () => void
	}
}

const DesktopHeader: FC<HeaderPropsType> = ({ logged, logout, user, isCommentsBlockVisible, toggleAuthFormVisiblility, toggleCommentsBlockVisibility, ...props }) => {
	const [popupVisible, setPopupVisibility] = useState(false)
	const banners = useSelector<AppStateType, Array<BannerType>>(state => state.app.banners).filter(banner => +banner.id === +BannerPositionEnum.header_big)
	
	const toggleUserPopupVisibility = (value?: boolean | any) => {
		if (!user.id) {
			return
		}

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
					{user.balance ? (+user.balance).toLocaleString() : 0} xB</span>
				</div>
				<div className={s.loggedUser}>
					<div onClick={toggleUserPopupVisibility} className={s.userImgBlock}>
						<img src={getUserImg(user.avatar)} alt="user-img" />
						<button className={s.userBlockToggler} >
							<FontAwesomeIcon icon={faCaretDown} />
						</button>
					</div>

					{logged && popupVisible &&
						<UserMobilePopup
							logout={logout}
							loggedUser={user}
							toggleUserPopupVisibility={toggleUserPopupVisibility}
						/>}

				</div>
			</div>
	} else {
		authedBlock = (
			<div className={s.headerUserBlock}>
				<div><Banner position={BannerPositionEnum.header} /></div>
				<button className={s.loginBtn} onClick={toggleAuthFormVisiblility}>
					<FontAwesomeIcon icon={faUser} className={s.loginIcon} />
					<span>Войти</span>
				</button>
			</div>)

	}

	return (
		<div className={classNames(s.desktopHeader, {[s.withAdvert]: banners.length > 0})}>
			<Banner position={BannerPositionEnum.header_big} />

			<header>
				<NavLink to="/" className={s.logoLink}><img src={logo} className={s.logo} alt="logo" /></NavLink>
				<Search search={props.search} />

				{authedBlock}

				{isCommentsBlockVisible && <LiveBtn toggleCommentsBlockVisibility={toggleCommentsBlockVisibility} />}

			</header>
		</div>
	)
}

export default DesktopHeader;