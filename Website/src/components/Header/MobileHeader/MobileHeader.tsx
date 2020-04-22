import React, { FC, useState } from 'react';
import s from './MobileHeader.module.scss';
import classNames from 'classnames'
import { NavLink } from 'react-router-dom';

import logo from '../../../assets/img/logo.png'

import MobileSearch from './MobileSearch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

type HeaderPropsType = {

}

const MobileHeader: FC<HeaderPropsType> = ({ ...props }) => {
	const [seactBlockVisible, setSearchBlockVisibility] = useState(false)

	const toggleSeachBlockVisibility = () => {
		setSearchBlockVisibility(!seactBlockVisible)
	}


	let inputRef = React.createRef<HTMLInputElement>()
	return (
		<div className={s.mobileHeader}>
			<div className={s.advert}></div>
			<header>
				<NavLink to="/" className={s.logoLink}><img src={logo} className={s.logo} alt="logo" /></NavLink>
				{true && <div className={s.bankBlock}>Банк: <span>1 500 xB</span></div>}
				<button onClick={toggleSeachBlockVisibility} className={classNames(s.searchToggleIcon, { [s.active]: seactBlockVisible })}><FontAwesomeIcon icon={faSearch} /></button>

			</header>
			<div className={classNames(s.search_block, { [s.active]: seactBlockVisible })}>
				<button className={s.seachIcon}><FontAwesomeIcon icon={faSearch} /></button>
				<input type="text" placeholder="поиск..." ref={inputRef} onBlur={toggleSeachBlockVisibility} />
			</div>
		</div>
	)
}

export default MobileHeader;