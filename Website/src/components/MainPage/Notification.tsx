import React, { FC, useEffect, useState, useCallback } from 'react';
import s from './MainPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


type NotificationProps = {
	notification: string
}

const Notification: FC<NotificationProps> = ({ notification, ...props }) => {
	const [notificationVisibility, setNotificationVisibility] = useState(true)
	if (!notification || !notificationVisibility) {
		return <></>
	}
	return (
		<div className={s.notificationBlock} >
			<div dangerouslySetInnerHTML={{ __html: notification }}></div>
			<button onClick={() => { setNotificationVisibility(false) }}><FontAwesomeIcon icon={faTimes}/></button>
		</div>
	)
}

export default Notification;