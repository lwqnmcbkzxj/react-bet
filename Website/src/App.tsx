import React, { FC, useState, useEffect } from 'react'
import './App.scss'
import { Route, NavLink } from "react-router-dom"
import { Switch } from 'react-router'
import { withRouter } from 'react-router'


import AuthFormContainer from './components/AuthForm/AuthFormContainer'

import ForecastsContainer from './components/Forecasts/ForecastsContainer'
import ForecastContainer from './components/Forecast/ForecastContainer'

import UsersContainer from './components/Users/UsersContainer'
import UserContainer from './components/User/UserContainer'

import BookmakersContainer from './components/Bookmakers/BookmakersContainer'
import BookmakerContainer from './components/Bookmaker/BookmakerContainer'

import MatchesContainer from './components/Matches/MatchesContainer'
import MatchContainer from './components/Match/MatchContainer'

import NewsContainer from './components/News/NewsContainer'
import NewsSingleContainer from './components/NewsSingle/NewsSingleContainer'

import ArticleContainer from './components/Article/ArticleContainer'
import ArticlesContainer from './components/Articles/ArticlesContainer'

import MainPageContainer from './components/MainPage/MainPageContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import MenuContainer from './components/Menu/MenuContainer'
import CommentsContainer from './components/Comments/CommentsContainer'


import NotFound from './components/NotFound/NotFound'
import AddForecastContainer from './components/Forecasts/AddForecast/AddForecastContainer'

import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from './types/types'

import { toggleAuthFormVisiblility } from './redux/app-reducer'


const App = (props: any) => {
	const logged = useSelector<AppStateType, boolean>(state => state.user.logged)
	const dispatch = useDispatch()


	return (
		<div className="app-wrapper">

			<HeaderContainer />
			<AuthFormContainer />

			<div className='app-container'>
				<MenuContainer />

				<div className="app-content">
					<Switch>
						<Route exact path="/" render={() => <MainPageContainer />} />

						<Route exact path="/forecasters" render={() => <UsersContainer />} />
						<Route exact path="/forecasters/:userId" render={() => <UserContainer />} />


						<Route exact path="/forecasts" render={() => <ForecastsContainer />} />
						<Route exact path="/forecasts/add" render={() => <AddForecastContainer />} />

						<Route exact path="/forecasts/:forecastId" render={() => <ForecastContainer />} />



						<Route exact path="/bookmakers" render={() => <BookmakersContainer />} />
						<Route exact path="/bookmakers/:bookmakerId" render={() => <BookmakerContainer />} />
						
						<Route exact path="/matches" render={() => <MatchesContainer />} />
						<Route path="/matches/:matchId" render={() => <MatchContainer />} />

						<Route exact path="/articles" render={() => <ArticlesContainer />} />
						<Route exact path="/articles/:articleId" render={() => <ArticleContainer />} />

						<Route exact path="/news" render={() => <NewsContainer />} />
						<Route exact path="/news/:newsId" render={() => <NewsSingleContainer />} />
						
						<Route component={NotFound} />

					</Switch>
				</div>
				<CommentsContainer />

			</div>

		</div>
	)
}

export default withRouter(App);
