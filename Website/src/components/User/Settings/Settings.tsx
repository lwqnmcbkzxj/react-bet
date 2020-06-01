import React, { FC, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import s from './Settings.module.scss';
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import userNoImg from '../../../assets/img/user-no-image.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { UserType as LoggedUserType } from '../../../types/me'
import Selectors from '../../Common/Selectors/Selectors';
import { LanguageType, languageEnum } from '../../../types/filters';
import SettingsFormBlock from './SettingsForm';

import androidDownload from '../../../assets/img/google-play-btn.png'
import iosDownload from '../../../assets/img/app-store-btn.png'
import { apiURL } from '../../../api/api';
import { change } from 'redux-form';

type SettingsPropsType = {
	loggedUser: LoggedUserType
	languages: Array<LanguageType>
	changeLanguage: (language: languageEnum) => void
	logout: () => void
}
const Settings: FC<SettingsPropsType> = ({ loggedUser, languages, changeLanguage, logout, ...props }) => {
	const dispatch = useDispatch()
	let initialValues = { email: loggedUser.email }


	let userAvatar = loggedUser.avatar ? apiURL + loggedUser.avatar : userNoImg

	const changePhoto = (e: any) => {
		dispatch(change('profile-form', 'file', e.currentTarget.files[0]))

		let fileReader = new FileReader()
		fileReader.onload = function (event: any) {
			document.getElementById('user-img-holder')?.setAttribute("src", event.target.result)
		}

		fileReader.readAsDataURL(e.currentTarget.files[0])
	}

	const uploadFileRef = React.createRef<HTMLInputElement>()
	return (
		<div className={s.userSettings}>
			<div className={s.userInfo}>
				<div className={s.userDetails}>
					<input type="file" onChange={changePhoto} ref={uploadFileRef} />
					<img
						src={userAvatar}
						alt="user-img"
						onClick={() => { uploadFileRef.current?.click() }}
						id={"user-img-holder"}
					/>
					
					<div className={s.nickName}>
						<p>{loggedUser.login}</p>
						<div className={s.userStats}>
							<p className={s.positive}>{loggedUser.stats.count_win}</p>/
							<p className={s.negative}>{loggedUser.stats.count_loss}</p>/
							<p className={s.neutral}>{loggedUser.stats.count_back}</p>
						</div>
					</div>
					<Link to={`/forecasters/${loggedUser.id}`}>
						<button className={classNames(s.profileBtn, s.settingsBtn, s.active)}>
							<span><FontAwesomeIcon icon={faCog} className={s.settingIcon} /></span>
							<p>Настройки</p>
						</button>
					</Link>
					<div className={s.userBalance}>
						<p className={s.bank}><span>Банк:</span> {((+loggedUser.balance).toFixed(2).toLocaleString())}xB</p>
					</div>
				</div>
			</div>

			<div className={s.settings}>
				<div className={s.common}>
					<div className={s.download}>
						<a href="#"><img src={androidDownload} alt="android-download"/></a>
						<a href="#"><img src={iosDownload} alt="ios-download"/></a>
					</div>
					{/* <Selectors
						selectors={languages}
						selectorsBlockName={'languages'}
						onChangeFunc={changeLanguage}
						fillBg={true}
					/> */}
				</div>

				 <SettingsFormBlock
					initialValues={initialValues}
				/> 

				{/* <div className={s.notifications}>
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
				</div> */}

			</div>


			<button onClick={logout} className={s.logoutBtn}>Выйти</button>
		</div>
	)
}
export default Settings;