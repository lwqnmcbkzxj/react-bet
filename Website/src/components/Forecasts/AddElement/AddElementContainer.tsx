import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from '../../../types/types'
import AddExpress from './AddExpress'
import AddForecast from './AddForecast'
import { withRouter, RouteComponentProps, Switch, Route } from 'react-router'
import { toggleAuthFormVisiblility } from '../../../redux/app-reducer'
import { withAuthRedirect } from '../../../hoc/withAuthRedirect'

const AddElementContainer: FC = (props) => {
	const logged = useSelector<AppStateType, boolean>(state => state.me.logged)
	const userBalance = useSelector<AppStateType, string>(state => state.me.userInfo.balance)
	// const dispatch = useDispatch()
	return (
		logged ?
			<Switch>
				<Route exact path="/forecasts/add/express" render={() => <AddExpress />} />
				<Route exact path="/forecasts/add/forecast" render={() =>
					<AddForecast
						userBalance={+userBalance}
					/>} />
			</Switch>
			: <div></div>
	)
}

export default AddElementContainer;