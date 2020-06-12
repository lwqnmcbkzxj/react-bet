

import React, { FC, useState, useEffect } from 'react'
import './App.scss'
import './assets/scss/CommonStyle.scss'
import { Route, NavLink } from "react-router-dom"
import { Switch } from 'react-router'
import { withRouter } from 'react-router'
import qs from 'query-string'

import AuthFormContainer from './components/AuthForm/AuthFormContainer'

import HeaderContainer from './components/Header/HeaderContainer'
import MenuContainer from './components/Menu/MenuContainer'
import CommentsContainer from './components/Comments/CommentsContainer'
import Footer from './components/Common/Footer/Footer'
import NotFound from './components/NotFound/NotFound'
import Policy from './components/Common/Documents/Policy'
import Terms from './components/Common/Documents/Terms'
import Feedback from './components/Common/Feedback/Feedback'

import UsersContainer from './components/Users/UsersContainer'
import UserContainer from './components/User/UserContainer'
import SettingsContainer from './components/User/Settings/SettingsContainer'

import BookmakersContainer from './components/Bookmakers/BookmakersContainer'
import BookmakerContainer from './components/Bookmaker/BookmakerContainer'

import MatchesContainer from './components/Matches/MatchesContainer'
import MatchContainer from './components/Match/MatchContainer'

import NewsContainer from './components/News/NewsContainer'

import ArticleContainer from './components/Article/ArticleContainer'
import ArticlesContainer from './components/Articles/ArticlesContainer'

import { useDispatch, useSelector } from "react-redux"
import { AppStateType, OptionsType } from './types/types'
import { withSuspense } from './hoc/withSuspense';

import { initApp } from './redux/app-reducer'
import { authUser, setLogged, setAccessToken } from './redux/me-reducer'
import useMobile from './hooks/useMobile'
import { UserType } from './types/me'
import Cookies from 'js-cookie'
import { showAlert } from './utils/showAlert'


const Admin = React.lazy(() => import('./components/Admin/Admin'))
const ForecastsContainer = React.lazy(() => import('./components/Forecasts/ForecastsContainer'))
const ForecastContainer = React.lazy(() => import('./components/Forecast/ForecastContainer'))
const AddElementContainer = React.lazy(() => import('./components/Forecasts/AddElement/AddElementContainer'))
const MainPageContainer = React.lazy(() => import('./components/MainPage/MainPageContainer'))


const App = (props: any) => {
	const isMobile = useMobile(768)
	const dispatch = useDispatch()
	const options = useSelector<AppStateType, OptionsType>(state => state.app.options)

	const loggedUser = useSelector<AppStateType, UserType>(state => state.me.userInfo)
	useEffect(() => {
		dispatch(initApp())
		dispatch(authUser())
	}, [])


	useEffect(() => {
		if (options.head_scripts) {
			const script = document.createElement('script');
  			script.src = eval(options.head_scripts);
  			document.head.appendChild(script);
		}
		if (options.footer_scripts) {
			const script = document.createElement('script');
  			script.src = eval(options.head_scripts);
  			document.body.appendChild(script);
		}
	}, [options])

	if (props.location.search) {
		let params = qs.parse(props.location.search)
		if (params.token) {
			props.history.push("/")
			Cookies.set('access-token', params.token + "", { expires: 10 / 24 });
			dispatch(authUser())
		}
	}



	useEffect(() => {
		window.addEventListener("unhandledrejection", catchAllUnhandledErrors as any);
		return () => { window.removeEventListener("unhandledrejection", catchAllUnhandledErrors as any);	 }
	}, [])
	const catchAllUnhandledErrors = (reason: any, promiseRejectionEvent: any) => {
		console.error(reason + '\n' + promiseRejectionEvent);
        showAlert('error', "Произошла непредвиденная ошибка");
	}
	


	return (
		<Switch>
			{/* {loggedUser.role_id > 2 && */}
				<Route path="/admin" render={withSuspense(Admin)} />
			{/* } */}

			<Route component={() =>
				<div className="app-wrapper">

					<HeaderContainer />
					<AuthFormContainer />
					<div className='app-container'>
						<MenuContainer />
						<div className="app-content">
							<Switch>
								<Route exact path="/" render={withSuspense(MainPageContainer)} />

								<Route exact path="/forecasters" render={() => <UsersContainer />} />
								<Route exact path="/forecasters/:userId" render={() => <UserContainer />} />
								<Route path="/forecasters/:userId/settings" render={() => <SettingsContainer />} />

								<Route exact path="/forecasts" render={withSuspense(ForecastsContainer)} />
								<Route exact path="/forecasts/:forecastId" render={withSuspense(ForecastContainer)} />
								<Route path="/forecasts/add" render={withSuspense(AddElementContainer)} />

								<Route exact path="/bookmakers" render={() => <BookmakersContainer />} />
								<Route exact path="/bookmakers/:bookmakerId" render={() => <BookmakerContainer />} />

								<Route exact path="/matches" render={() => <MatchesContainer />} />
								<Route path="/matches/:matchId" render={() => <MatchContainer />} />

								<Route exact path="/articles" render={() => <ArticlesContainer />} />
								<Route exact path="/articles/:articleId" render={() => <ArticleContainer />} />

								<Route exact path="/news" render={() => <NewsContainer />} />

								<Route exact path="/feedback" render={() => <Feedback />} />
								<Route exact path="/policy" render={() => <Policy />} />
								<Route exact path="/terms" render={() => <Terms />} />

								<Route component={NotFound} />

							</Switch>
							{isMobile && <Footer />}
						</div>
						<CommentsContainer />
					</div>
				</div>

			} />

		</Switch>
	)
}

export default withRouter(App);
