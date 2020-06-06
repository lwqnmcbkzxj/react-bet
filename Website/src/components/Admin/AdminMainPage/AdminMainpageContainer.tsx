import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import s from './Admin.module.scss'
import { Switch, Route } from 'react-router'
import Mainpage from './AdminMainpage'
import { AppStateType } from '../../../types/types'
import { DashboardType } from '../../../types/admin'
import { getDashboardInfo } from '../../../redux/admin-reducer'
import Preloader from '../../Common/Preloader/Preloader'

const AdminMainPageContainer: FC = ({ ...props }) => {
	const dispatch = useDispatch()
	const dashboard = useSelector<AppStateType, DashboardType>(state => state.admin.dashboardInfo)
	const isFetchingArray = useSelector<AppStateType, Array<string>>(state => state.admin.isFetchingArray)


	useEffect(() => {	
		dispatch(getDashboardInfo())
	}, [])

	return (
		isFetchingArray.includes('dashboard') ? <Preloader /> : 
		<Mainpage
			dashboard={dashboard}
		/>
	)
}

export default AdminMainPageContainer;