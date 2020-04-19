import React, { FC } from 'react';
import s from './MobileHeader.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


type HeaderPropsType = {
	
}

const MobileHeader: FC<HeaderPropsType> = ({ ...props }) => {

	return (
		<div className={s.search}>
			
		</div>
	)
}

export default MobileHeader;