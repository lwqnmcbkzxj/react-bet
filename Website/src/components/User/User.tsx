import React, { FC } from 'react';
import s from './User.module.scss';
import '../../App.scss'
import { UserType } from '../../types/users'


type UsersPropsType = {
	user: UserType
}
const User: FC<UsersPropsType> = ({ user, ...props }) => {
	return (
		<div className={s.user}>
			
		</div>
	)
}
export default User;