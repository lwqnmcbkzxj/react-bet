import React, { FC, useState, useEffect } from 'react';
import s from './Subscribe.module.scss';
import classNames from 'classnames'
import { UserType } from '../../../types/users'

import { toggleAuthFormVisiblility } from '../../../redux/app-reducer'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../../types/types';
import { subscribeUser } from '../../../redux/user-reducer'

type SubscribeButtonPropsType = {
	userId: number
	responsive?: boolean
}


const SubscribeButton: FC<SubscribeButtonPropsType> = ({ userId, responsive = true, ...props }) => {
	const dispatch = useDispatch()
	const logged = useSelector<AppStateType, boolean>(state => state.me.logged)


	const [subscribed, setSubscribed] = useState(false)
	const subscribeToggle = (id: number) => {
		if (!logged) {
			dispatch(toggleAuthFormVisiblility())
			return 0
		} else {
			setSubscribed(!subscribed)
			dispatch(subscribeUser(id))
		}
	}
	const [subBtnHovered, setSubscribedBtnHovered] = useState(false)
	const [subBtnHoverCounter, setSubBtnHoverCounter] = useState(0)


	let profileBtn
	if (subscribed) {
		let icon
		let subBtnText
		if (subBtnHovered && subBtnHoverCounter > 0) {
			icon = <FontAwesomeIcon icon={faTimes} className={s.checkedIcon + ' ' + s.negative} />
			subBtnText = 'Отписаться'
		} else {
			icon = <FontAwesomeIcon icon={faCheck} className={s.checkedIcon + ' ' + s.positive} />
			subBtnText = 'Подписан'
		}

		profileBtn =
			<button
			className={classNames(s.profileBtn, s.subscribe, {[s.responsive]: responsive })}
				onClick={() => { subscribeToggle(userId) }}
				onMouseEnter={(e) => { setSubscribedBtnHovered(true); setSubBtnHoverCounter(subBtnHoverCounter + 1); }}
				onMouseLeave={(e) => { setSubscribedBtnHovered(false); }}>
				{icon}
				<p>{subBtnText}</p>
			</button>
	} else {
		profileBtn =
			<button className={classNames(s.profileBtn, s.subscribe, { [s.responsive]: responsive })}
				onClick={() => { subscribeToggle(userId); setSubBtnHoverCounter(0); }}>
				<span>+</span> <p>Подписаться</p>
			</button>
	}



	return (
		profileBtn
	)
}
export default SubscribeButton;