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

const BookmakersContainer = React.lazy(() => import('./AdminBookmakers/BookmakersContainer'))
const BookmakerContainer = React.lazy(() => import('./AdminBookmakers/Bookmaker/BookmakerContainer'))

const ChampionshipsContainer = React.lazy(() => import('./AdminChampionships/ChampionshipsContainer'))
const ChampionshipContainer = React.lazy(() => import('./AdminChampionships/Championship/ChampionshipContainer'))

const EventsContainer = React.lazy(() => import('./AdminEvents/EventsContainer'))
const EventContainer = React.lazy(() => import('./AdminEvents/Event/EventContainer'))

const PolicyContainer = React.lazy(() => import('./SimpleForms/PolicyContainer'))
const TermsContainer = React.lazy(() => import('./SimpleForms/TermsContainer'))
const OptionsContainer = React.lazy(() => import('./Options/OptionsContainer'))

type RouterInstanceType = {
	rootRoute: string
	idName: string
	ListComponent: React.Component | any
	ElementComponent: React.Component | any
}

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
					<Route path="/admin/users/:userId/forecasts" render={withSuspense(ForecastsContainer)} />

					<Route exact path="/admin/forecasts" render={withSuspense(ForecastsContainer)} />
					<Route path="/admin/forecasts/add" render={withSuspense(ForecastContainer)} />
					<Route path="/admin/forecasts/:forecastId/edit" render={withSuspense(ForecastContainer)} />

					<Route exact path="/admin/articles" render={withSuspense(ArticlesContainer)} />
					<Route path="/admin/articles/add" render={withSuspense(ArticleContainer)} />
					<Route path="/admin/articles/:articleId/edit" render={withSuspense(ArticleContainer)} />

					<Route exact path="/admin/bookmakers" render={withSuspense(BookmakersContainer)} />
					<Route path="/admin/bookmakers/add" render={withSuspense(BookmakerContainer)} />
					<Route path="/admin/bookmakers/:bookmakerId/edit" render={withSuspense(BookmakerContainer)} />

					<Route exact path="/admin/events" render={withSuspense(EventsContainer)} />
					<Route path="/admin/events/add" render={withSuspense(EventContainer)} />
					<Route path="/admin/events/:eventId/edit" render={withSuspense(EventContainer)} />

					<Route exact path="/admin/championships" render={withSuspense(ChampionshipsContainer)} />
					<Route path="/admin/championships/add" render={withSuspense(ChampionshipContainer)} />
					<Route path="/admin/championships/:championshipId/edit" render={withSuspense(ChampionshipContainer)} />
					

					{/* <Route exact path="/admin/banners" render={withSuspense(BannersContainer)} /> */}
					{/* <Route path="/admin/banners/add" render={withSuspense(BannerContainer)} /> */}
					{/* <Route path="/admin/banners/:bannerId/edit" render={withSuspense(BannerContainer)} /> */}
					<Route exact path="/admin/banners" render={() => <div>BANNERS</div>} />
					<Route path="/admin/banners/add" render={() => <div>BANNER ADD</div>} />
					<Route path="/admin/banners/:bannerId/edit" render={() => <div>BANNER EDIT</div>} />


					<Route path="/admin/policy" render={withSuspense(PolicyContainer)} />
					<Route path="/admin/terms" render={withSuspense(TermsContainer)} />

					<Route path="/admin/options" render={withSuspense(OptionsContainer)} />
					<Route path="/admin/information" render={() => <div>Управлеине информацией</div>} />
					<Route render={NotFound} />
				</Switch>
			</div>

		</div>
	)
}

export default Admin;