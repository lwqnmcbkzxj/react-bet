import React, { FC } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import { UsersFiltersType, UserType } from '../../types/users'

import Forecasters from './Users'
import { toggleFilter } from '../../redux/users-reducer'
import { withRouter, RouteComponentProps  } from 'react-router'

interface MatchParams {
    userId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const UsersContainer: FC<Props> = ({ ...props }) => {
	const users = useSelector<AppStateType, Array<UserType>>(state => state.users.users)
	const filters = useSelector<AppStateType, UsersFiltersType>(state => state.users.filters)


	const dispatch = useDispatch()
	const toggleFilterDispatch = (filterName: string, filtersBlockName: string) => {
		dispatch(toggleFilter(filterName, filtersBlockName))
	}

	let userId = props.match.params.userId ? props.match.params.userId : 1;

	return (
		<Forecasters
			users={users}
			filters={filters}
			toggleFilter={toggleFilterDispatch}
		/>
	)
}

export default withRouter(UsersContainer);