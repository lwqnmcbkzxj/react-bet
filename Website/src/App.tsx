import React, { FC, useState } from 'react'
import './App.css'
import { Route, NavLink } from "react-router-dom"
import { Switch } from 'react-router'
import { withRouter } from 'react-router'


import AuthFormContainer from './components/AuthForm/AuthFormContainer'

import ForecastsContainer from './components/Forecasts/ForecastsContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import MenuContainer from './components/Menu/MenuContainer'
import CommentsContainer from './components/Comments/CommentsContainer'


import NotFound from './components/NotFound/NotFound'

const App: FC = () => {
	return (
		<div className="app-wrapper">
			<Route path="/" render={() => <HeaderContainer />} />
			<Route path="/" render={() => <AuthFormContainer />} />

			<div className='app-container'>
				<Route path="/" render={() => <MenuContainer />} />

				<div className="app-content">
					<Switch>
						{/* <Route exact path="/" render={() => <ProductsListContainer />} /> */}
						{/* <Route path="/" render={() => <MainPageContainer />} /> */}

						{/* <Route path="/" render={() => <ForecastersContainer />} /> */}
						<Route path="/" render={() => <ForecastsContainer />} />
						{/* <Route path="/" render={() => <MatchesContainer />} /> */}

						{/* <Route path="/" render={() => <ArticlesContainer />} /> */}
						{/* <Route path="/" render={() => <NewsContainer />} /> */}
						{/* <Route path="/" render={() => <UserContainer />} /> */}
						<Route component={NotFound} />

					</Switch>
				</div>
				<Route path="/" render={() => <CommentsContainer />} />

			</div>
		</div>
	)
}

export default withRouter(App);