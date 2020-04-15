import React, { FC, useState } from 'react'
import './App.css'
import { Route, NavLink } from "react-router-dom"
import { Switch } from 'react-router'
import { withRouter } from 'react-router'


import AuthFormContainer from './components/AuthForm/AuthFormContainer'


import HeaderContainer from './components/Header/HeaderContainer'
import MenuContainer from './components/Menu/MenuContainer'
import CommentsContainer from './components/Comments/CommentsContainer'


import NotFound from './components/NotFound/NotFound'
 
const App: FC = () => {
	const [isAuthFormVisible, setAuthFormVisible] = useState(false)
	const toggleAuthFormVisible = () => {
		setAuthFormVisible(!isAuthFormVisible)
	}
	const [commentsBlockVisible, setCommentsBlockVisible] = useState(true)

	const toggleCommentsVisible = () => {
		setCommentsBlockVisible(!commentsBlockVisible)
	}

	return (
		<div className="app-wrapper">
			<Route path="/" render={() => <HeaderContainer toggleAuthFormVisible={toggleAuthFormVisible} toggleCommentsVisible={toggleCommentsVisible}/>} />
			<Route path="/" render={() => <MenuContainer />} />
			<Route path="/" render={() => <CommentsContainer />} />
			<Route path="/" render={() => <AuthFormContainer isAuthFormVisible={isAuthFormVisible} toggleAuthFormVisible={toggleAuthFormVisible}/>} />
			
			<div className='app-container'>
				<Switch>
					{/* <Route exact path="/" render={() => <ProductsListContainer />} /> */}
					{/* <Route path="/" render={() => <MainPageContainer />} /> */}

					{/* <Route path="/" render={() => <ForecastersContainer />} />						 */}
					{/* <Route path="/" render={() => <ForecastsContainer />} /> */}
					{/* <Route path="/" render={() => <MatchesContainer />} /> */}

					{/* <Route path="/" render={() => <ArticlesContainer />} /> */}
					{/* <Route path="/" render={() => <NewsContainer />} /> */}
					{/* <Route path="/" render={() => <UserContainer />} /> */}
					
					<Route component={NotFound} />
				</Switch>
			</div>
		</div>
	)
}

export default withRouter(App);