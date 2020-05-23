import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from '../../types/types'
import s from './Admin.module.scss'
import { Switch, Route } from 'react-router'
import { withSuspense } from '../../hoc/withSuspense';

import AdminHeaderContainer from './AdminHeader/AdminHeaderContainer'
import NotFound from '../NotFound/NotFound'
const AdminMainPageContainer = React.lazy(() => import('./AdminMainPage/AdminMainpageContainer'))
const UsersContainer = React.lazy(() => import('./AdminUsers/UsersContainer'))

const Admin: FC = ({ ...props }) => {

	const dispatch = useDispatch()

	useEffect(() => {
	}, []);

	
	return (
		<div className={s.admin}>
			<AdminHeaderContainer />
			<div className={s.adminContent}>
				<Switch>
					<Route exact path="/admin" render={withSuspense(AdminMainPageContainer)} />
					<Route path="/admin/users" render={withSuspense(UsersContainer)} />
					{/* <Route path="/admin/sports" render={() => <SportsContainer />} /> */}
					{/* <Route path="/admin/articles" render={() => <ArticlesConteiner />} /> */}
					{/* <Route path="/admin/bookmakers" render={() => <BookmakersContainer />} /> */}


					<Route render={NotFound} />
				</Switch>
			</div>

		</div>
	)
}

export default Admin;