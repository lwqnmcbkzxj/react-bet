import React, { FC } from 'react';

import s from './Footer.module.scss';
import classNames from 'classnames'

import { Link } from 'react-router-dom';

import androidDownload from '../../../assets/img/google-play-btn.png'
import iosDownload from '../../../assets/img/app-store-btn.png'

import LanguageSelector from './LanguageSelector/LanguageSelector'
import { useSelector } from 'react-redux';
import { AppStateType, OptionsType } from '../../../types/types';

import vkLogo from '../../../assets/img/vk-logo.png'
import instagramLogo from '../../../assets/img/instagram-logo.png'
import facebookLogo from '../../../assets/img/facebook-logo.png'


type MenuFooterPropsType = {
	
}

const MenuFooter: FC<MenuFooterPropsType> = ({ ...props }) => {
	const options = useSelector<AppStateType, OptionsType>(state => state.app.options)
	return (
		<div className={s.menuFooter}>
			
			<LanguageSelector />

			<Link className={classNames(s.menuFooterLink, s.feedback)} to="/feedback">Обратная связь</Link>
			<Link className={s.menuFooterLink} to="/policy" >Политика конфиденциальности</Link>
			<div className={s.download}>
				<a href={options.android_link} target="_blank"><img src={androidDownload} alt="android-download"/></a>
				<a href={options.ios_link} target="_blank"><img src={iosDownload} alt="ios-download"/></a>
			</div>
			<div className={s.social}>
				
				
				
				<a href={options.vkontakte} target="_blank" className={s.social__link}><img src={vkLogo} alt="vk-logo"/></a>
				<a href={options.instagram} target="_blank" className={s.social__link}><img src={instagramLogo} alt="vk-logo"/></a>
				<a href={options.facebook} target="_blank" className={s.social__link}><img src={facebookLogo} alt="vk-logo"/></a>
			</div>
			{/* <p className={s.copyright}>© {new Date().getFullYear() } г. Betting HUB</p> */}
			<p className={s.copyright}>{options.copyright}</p>
		</div>
	)
}

export default MenuFooter;