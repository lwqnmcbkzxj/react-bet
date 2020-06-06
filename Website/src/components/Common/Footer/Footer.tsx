import React, { FC } from 'react';

import s from './Footer.module.scss';
import classNames from 'classnames'

import { Link } from 'react-router-dom';

import androidDownload from '../../../assets/img/google-play-btn.png'
import iosDownload from '../../../assets/img/app-store-btn.png'

import LanguageSelector from './LanguageSelector/LanguageSelector'
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../types/types';

type MenuFooterPropsType = {
	
}

const MenuFooter: FC<MenuFooterPropsType> = ({ ...props }) => {
	const mobileAppLinks = useSelector<AppStateType, any>(state => state.app.mobileAppLinks)
	return (
		<div className={s.menuFooter}>
			
			<LanguageSelector />

			<Link className={classNames(s.menuFooterLink, s.feedback)} to="/feedback">Обратная связь</Link>
			<Link className={s.menuFooterLink} to="/policy" >Политика конфиденциальности</Link>
			<div className={s.download}>
				<a href={mobileAppLinks.android} target="_blank"><img src={androidDownload} alt="android-download"/></a>
				<a href={mobileAppLinks.ios} target="_blank"><img src={iosDownload} alt="ios-download"/></a>
			</div>
			<p className={s.copyright}>© {new Date().getFullYear() } г. Betting HUB</p>
			
		</div>
	)
}

export default MenuFooter;