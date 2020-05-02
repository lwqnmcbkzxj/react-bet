import React, { FC, useState, useEffect } from 'react';
import s from './Settings.module.scss';
import classNames from 'classnames'
import '../../../App.scss'
import { Link } from 'react-router-dom'
import userNoImg from '../../../assets/img/user-no-image.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { UserType as LoggedUserType } from '../../../types/me'
import Selectors from '../../Common/Selectors/Selectors';
import { LanguageType, languageEnum } from '../../../types/filters';
import SettingsFormBlock from './SettingsForm';

type SettingsPropsType = {
	loggedUser: LoggedUserType
	languages: Array<LanguageType>
	changeLanguage: (language: languageEnum) => void
	logout: () => void
}
const Settings: FC<SettingsPropsType> = ({ loggedUser, languages, changeLanguage, logout, ...props }) => {
	let initialValues = { email: loggedUser.email }

	return (
		<div className={s.userSettings}>
			<div className={s.userInfo}>
				<div className={s.userDetails}>
					<img src={userNoImg} alt="user-img" />
					<div className={s.nickName}>Никнейм</div>


					<button className={classNames(s.profileBtn, s.settingsBtn, s.active)}>
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

			<div className={s.settings}>
				<div className={s.common}>
					<a href="https://play.google.com/store" className={s.rateBtn}>Оценить мобильное приложение</a>
					<Selectors
						selectors={languages}
						selectorsBlockName={'languages'}
						onChangeFunc={changeLanguage}
						fillBg={true}
					/>
				</div>

				<SettingsFormBlock
					initialValues={initialValues}
				/>

				<div className={s.notifications}>
					<div className={s.settingBlockHeader}>Настройка уведомлений:</div>
					<div className={s.notification}>
						<div className={s.toggler}>
							<input type="checkbox" />
						</div>
						<p className={s.notificationText}>Уведомления на почту</p>
					</div>
					<div className={s.notification}>
						<div className={s.toggler}>
							<input type="checkbox" />
						</div>
						<p className={s.notificationText}>Уведомления на телефон</p>
					</div>
					<div className={s.notification}>
						<div className={s.toggler}>
							<input type="checkbox" />
						</div>
						<p className={s.notificationText}>Ответы на комментарии</p>
					</div>
				</div>

			</div>
		
					
			<button onClick={logout} className={s.logoutBtn}>Выйти</button>
		</div>
	)
}
export default Settings;