import React from 'react';
import s from './Header.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Search = () => {
	return (
		<div className={s.search_block} >
			<input type="text" placeholder="поиск..."/>
			<button><FontAwesomeIcon icon={faSearch} className={ s.searchIcon }/></button>
		</div>
	)
}

export default Search;