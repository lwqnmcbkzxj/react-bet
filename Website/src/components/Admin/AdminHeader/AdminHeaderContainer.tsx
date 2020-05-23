import React, { FC } from 'react';
import { AppStateType } from '../../../types/types'
import { UserType } from '../../../types/me'
import AdminHeader from './AdminHeader'
import { useSelector } from 'react-redux';


const AdminHeaderConainer: FC = () => {
	let user = useSelector<AppStateType, UserType>(state => state.me.userInfo);

	return (
		<AdminHeader
			user={user}
		/>
	)
}

export default AdminHeaderConainer;