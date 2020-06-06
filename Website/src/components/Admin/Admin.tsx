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
const UserContainer = React.lazy(() => import('./AdminUsers/User/UserContainer'))

const ForecastsContainer = React.lazy(() => import('./AdminForecasts/ForecastsContainer'))
const ForecastContainer = React.lazy(() => import('./AdminForecasts/Forecast/ForecastContainer'))

const ArticlesContainer = React.lazy(() => import('./AdminArticles/ArticlesContainer'))
const ArticleContainer = React.lazy(() => import('./AdminArticles/Article/ArticleContainer'))

const PolicyContainer = React.lazy(() => import('./SimpleForms/PolicyContainer'))
const TermsContainer = React.lazy(() => import('./SimpleForms/TermsContainer'))


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
					<Route exact path="/admin/users" render={withSuspense(UsersContainer)} />
					<Route path="/admin/users/add" render={withSuspense(UserContainer)} />
					<Route path="/admin/users/:userId/edit" render={withSuspense(UserContainer)} />

					<Route exact path="/admin/forecasts" render={withSuspense(ForecastsContainer)} />
					<Route path="/admin/forecasts/add" render={withSuspense(ForecastContainer)} />
					<Route path="/admin/forecasts/:forecastId/edit" render={withSuspense(ForecastContainer)} />

					{/* <Route path="/admin/sports" render={() => <SportsContainer />} /> */}

					<Route exact path="/admin/articles" render={withSuspense(ArticlesContainer)} />
					<Route path="/admin/articles/add" render={withSuspense(ArticleContainer)} />
					<Route path="/admin/articles/:articleId/edit" render={withSuspense(ArticleContainer)} />

					{/* <Route path="/admin/bookmakers" render={() => <BookmakersContainer />} /> */}

					<Route path="/admin/policy" render={withSuspense(PolicyContainer)} />
					<Route path="/admin/terms" render={withSuspense(TermsContainer)} />


					<Route render={NotFound} />
				</Switch>
			</div>

		</div>
	)
}

export default Admin;