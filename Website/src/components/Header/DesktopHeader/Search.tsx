import React, { FC } from 'react';
import s from './Header.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

type SearchPropsType = {
	search: {
		searchText: string
		handleSearchTextChange: (searchText: string) => void
		handleSearch: () => void
	}
}

const Search: FC<SearchPropsType> = ({ ...props }) => {
	let searchObj = props.search
	return (
		<div className={s.search_block} >
			<input type="text" placeholder="поиск..." value={searchObj.searchText}
				onChange={(e) => { searchObj.handleSearchTextChange(e.target.value) }}
				onKeyUp={(e) => { if (e.keyCode === 13) searchObj.handleSearch() }}
			/>
			<button onClick={searchObj.handleSearch}><FontAwesomeIcon icon={faSearch} className={ s.searchIcon }/></button>
		</div>
	)
}

export default Search;