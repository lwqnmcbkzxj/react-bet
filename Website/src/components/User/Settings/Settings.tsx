import React, { FC, useState, useEffect } from 'react';
import s from './Settings.module.scss';
import classNames from 'classnames'
import '../../../App.scss'
import { Link } from 'react-router-dom'
import userNoImg from '../../../assets/img/user-no-image.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { UserType as LoggedUserType } from '../../../types/user'

type SettingsPropsType = {
	loggedUser: LoggedUserType

}
const Settings: FC<SettingsPropsType> = ({ loggedUser, ...props }) => {
	return (
		<div className={s.settings}>
			<div className={s.userInfo}>
				<div className={s.userDetails}>
					<img src={userNoImg} alt="user-img" />
					<div className={s.nickName}>Никнейм</div>


					<button className={classNames(s.profileBtn, s.settings, s.active)}>
						<Link to={`/forecasters/${loggedUser.id}`}>
							<span><FontAwesomeIcon icon={faCog} className={s.settingIcon} /></span>
							<p>Настройки</p>
						</Link>
					</button>

					<div className={s.userBalance}>
						<p className={s.bank}><span>Банк:</span> 166 500xB</p>

					</div>

				</div>
			</div>
			
			
		</div>
	)
}
export default Settings;