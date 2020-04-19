import React, { FC } from 'react';
import s from './MobileHeader.module.scss';
import { NavLink } from 'react-router-dom';

import logo from '../../../assets/img/mobile-logo.png'

import MobileSearch from './MobileSearch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

type HeaderPropsType = {
	
}

const MobileHeader: FC<HeaderPropsType> = ({ ...props }) => {
	return (
		<div className={s.mobileHeader}>
			<div className={s.advert}></div>
			<header>
				<NavLink to="/" className={s.logoLink}><img src={logo} className={s.logo} alt="logo" /></NavLink>
				{true && <div className={s.bankBlock}>Банк: <span>1 500 xB</span></div>  }
				{/* <MobileSearch /> */}
				<div className={s.searchBlock}>
					<FontAwesomeIcon icon={faSearch}/>
				</div>
			</header>
		</div>
	)
}

export default MobileHeader;