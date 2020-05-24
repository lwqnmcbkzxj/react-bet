import React, { FC, useState } from 'react';
import s from './Search.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

type SearchType = {
	placeholder: string
	handleSearch: (starchText: string) => void
}

const Search: FC<SearchType> = ({ placeholder, handleSearch, ...props }) => {
	const [searchText, setSearchText] = useState("")

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value)
	}

	return (
		<div className={s.search_block} >
			<input type="text" placeholder={placeholder} onChange={handleChange}/>
			<button><FontAwesomeIcon icon={faSearch} className={s.searchIcon} onClick={() => { handleSearch(searchText) }}/></button>
		</div>
	)
}

export default Search;