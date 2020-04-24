import React, { FC, useState } from 'react'
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
// import BookmakerContainer from './components/Bookmaker/BookmakerContainer'

import MatchesContainer from './components/Matches/MatchesContainer'
// import MatchContainer from './components/Match/MatchContainer'

import MainPageContainer from './components/MainPage/MainPageContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import MenuContainer from './components/Menu/MenuContainer'
import CommentsContainer from './components/Comments/CommentsContainer'


import NotFound from './components/NotFound/NotFound'




const App: FC = () => {


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
						<Route exact path="/forecasts/:forecastId" render={() => <ForecastContainer />} />

						<Route exact path="/bookmakers" render={() => <BookmakersContainer />} />
						{/* <Route exact path="/bookmakers/:bookmakerId" render={() => <BookmakerContainer />} /> */}
						
						<Route exact path="/matches" render={() => <MatchesContainer />} />
						{/* <Route path="/matches/:matchId" render={() => <MatchContainer />} /> */}

						{/* <Route path="/" render={() => <ArticlesContainer />} /> */}
						{/* <Route path="/" render={() => <NewsContainer />} /> */}
						<Route component={NotFound} />

					</Switch>
				</div>
				<CommentsContainer />

			</div>

		</div>
	)
}

export default withRouter(App);
