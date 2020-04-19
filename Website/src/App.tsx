import React, { FC, useState } from 'react'
import './App.css'
import { Route, NavLink } from "react-router-dom"
import { Switch } from 'react-router'
import { withRouter } from 'react-router'


import AuthFormContainer from './components/AuthForm/AuthFormContainer'

import ForecastsContainer from './components/Forecasts/ForecastsContainer'
import ForecastContainer from './components/Forecast/ForecastContainer'


import MainPageContainer from './components/MainPage/MainPageContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import MenuContainer from './components/Menu/MenuContainer'
import CommentsContainer from './components/Comments/CommentsContainer'


import NotFound from './components/NotFound/NotFound'




const App: FC = () => {


	return (
		<div className="app-wrapper">

			<HeaderContainer />

			{/* <Route path="/" render={() => <AuthFormContainer />} /> */}


			<div className='app-container'>
				<MenuContainer />

				<div className="app-content">
					<Switch>
						<Route exact path="/" render={() => <MainPageContainer />} />

						{/* <Route path="/forecasters" render={() => <ForecastersContainer />} /> */}
						<Route exact path="/forecasts" render={() => <ForecastsContainer />} />
						<Route exact path="/forecasts/:forecastId" render={() => <ForecastContainer />} />
						{/* <Route path="/" render={() => <MatchesContainer />} /> */}

						{/* <Route path="/" render={() => <ArticlesContainer />} /> */}
						{/* <Route path="/" render={() => <NewsContainer />} /> */}
						{/* <Route path="/" render={() => <UserContainer />} /> */}
						<Route component={NotFound} />

					</Switch>
				</div>
				<CommentsContainer />

			</div>

		</div>
	)
}

export default withRouter(App);
