import React, { FC } from 'react';
import s from './Menu.module.css';
import { NavLink } from 'react-router-dom';
import androidDownload from './../../assets/img/google-play-btn.png'
import iosDownload from './../../assets/img/app-store-btn.png'

type MenuFooterPropsType = {
	
}

const MenuFooter: FC<MenuFooterPropsType> = ({ ...props }) => {
	return (
		<div className={s.menuFooter}>
			<div className={s.languageSelector}>
				<p>Язык: русский</p>
			</div>
			<NavLink className={s.menuFooterLink} to="/feedback">Обратная связь</NavLink>
			<NavLink className={s.menuFooterLink} to="/confidential" >Политика конфиденциальности</NavLink>
			<div className={s.download}>
				<a href="#"><img src={androidDownload} alt="android-download"/></a>
				<a href="#"><img src={iosDownload} alt="ios-download"/></a>
			</div>
			<p className={s.copyright}>© {new Date().getFullYear() } г. Betting HUB</p>
			
		</div>
	)
}

export default MenuFooter;