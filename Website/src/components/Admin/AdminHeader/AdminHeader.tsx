import React, { FC, useEffect, useState } from 'react';
import s from './AdminHeader.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames'
import userImgPlaceholder from '../../../assets/img/user-no-image.png'

import logo from '../../../assets/img/logo_black.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { UserType } from '../../../types/me';
import exitIcon from '../../../assets/img/exit-icon.png'

import AdminMenu from './AdminMenu/AdminMenu'

type HeaderPropsType = {
	user: UserType
}

const DesktopHeader: FC<HeaderPropsType> = ({ user, ...props }) => {
	const [popupVisible, setPopupVisibility] = useState(false)
	const userPopupRef = React.createRef<HTMLDivElement>()
	const toggleUserPopupVisibility = () => {
		setPopupVisibility(!popupVisible)
	}
	useEffect(() => {
		document.addEventListener('click', (e: any) => {
			if (userPopupRef.current && !userPopupRef.current.contains(e.target)) {
				setPopupVisibility(false)
				e.stopPropagation()
			}
		})
		return () => { document.removeEventListener('click', () => { }) };
	}, [popupVisible]);
	return (
		<div className={s.desktopHeader}>
			<header>
				<Link to="/" className={s.logoLink}><img src={logo} className={s.logo} alt="logo" /></Link>

				<AdminMenu />

				<div className={s.headerUserBlock}>
					<div className={s.loggedUser} onClick={toggleUserPopupVisibility}>
						<p className={s.userLogin}>{user.login }</p>
						<img src={user.avatar ? user.avatar : userImgPlaceholder} alt="user-img" />
						<button>
							<FontAwesomeIcon
								icon={faCaretDown}
								className={classNames(s.userBlockToggler, { ["fa-rotate-180"]: popupVisible })} />
						</button>

						{popupVisible &&
							<div className={s.userPopup} ref={userPopupRef}>
								<Link to="/" className={s.popupRow + ' ' + s.logoutRow} onClick={toggleUserPopupVisibility}>
									<img src={exitIcon} alt="door-img" />
									<p>Выйти</p>
								</Link>
							</div>}
					</div>
				</div>
			</header>
		</div>
	)
}

export default DesktopHeader;