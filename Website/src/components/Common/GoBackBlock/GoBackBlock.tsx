import React, { FC } from 'react';
import s from './GoBackBlock.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faBookmark, } from '@fortawesome/free-regular-svg-icons'

import { NavLink } from 'react-router-dom';

type GoBackPropTypes = {
	link: string
	linkText: string
	icon?: any
	func?: () => void
}


const GoBackBlock: FC<GoBackPropTypes> = ({ link, linkText, icon, func = () => {}, ...props }) => {
	
		return (
			<div className={s.goBackBlock}>
				<NavLink to={`/${link}`} className={s.goBackPage}>
					<button className={s.goBackBtn}><FontAwesomeIcon icon={faArrowLeft}/></button>
					<p>{linkText}</p>
				</NavLink>
				<button className={s.goBackBlockIcon} onClick={func}><FontAwesomeIcon icon={icon}/></button>
			</div>
	)
}
export default GoBackBlock;