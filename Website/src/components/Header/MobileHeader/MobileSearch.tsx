import React, { FC } from 'react';
import s from './MobileHeader.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


type HeaderPropsType = {
	
}

const MobileHeader: FC<HeaderPropsType> = ({ ...props }) => {

	return (
		<div className={s.search_block} >
			
			<input type="text" placeholder="поиск..."/>
			
		</div>
	)
}

export default MobileHeader;