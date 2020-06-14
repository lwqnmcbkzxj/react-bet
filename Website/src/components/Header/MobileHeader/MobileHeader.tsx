import React, { FC, useState } from 'react';
import s from './MobileHeader.module.scss';
import classNames from 'classnames'
import { NavLink } from 'react-router-dom';

import logo from '../../../assets/img/logo.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { UserType } from '../../../types/me';

type HeaderPropsType = {
	logged: boolean
	user: UserType
	
	search: {
		searchText: string
		handleSearchTextChange: (searchText: string) => void
		handleSearch: () => void
	}
}

const MobileHeader: FC<HeaderPropsType> = ({ logged, search, user, ...props }) => {
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
				{logged && <div className={s.bankBlock}>Банк: <span>{user.balance}</span></div>}
				<button onClick={toggleSeachBlockVisibility} className={classNames(s.searchToggleIcon, { [s.active]: seactBlockVisible })}><FontAwesomeIcon icon={faSearch} /></button>


				<div className={classNames(s.search_block, { [s.active]: seactBlockVisible })}>
					<button className={s.seachIcon} onClick={search.handleSearch}><FontAwesomeIcon icon={faSearch} /></button>
					<input
						type="text"
						placeholder="поиск..."
						ref={inputRef}
						onBlur={toggleSeachBlockVisibility}
						value={search.searchText}
						onChange={(e) => { search.handleSearchTextChange(e.target.value) }} />
				</div>
			</header>
			
		</div>
	)
}

export default MobileHeader;