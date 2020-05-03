import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import { FilterNames, FiltersObjectType } from '../../types/filters'
import { UserType } from '../../types/users'
import Forecasters from './Users'
import { toggleFilter } from '../../redux/users-reducer'
import { withRouter, RouteComponentProps } from 'react-router'
import { getUsersFromServer } from '../../redux/users-reducer'

const UsersContainer: FC = ({ ...props }) => {
	const users = useSelector<AppStateType, Array<UserType>>(state => state.users.users)
	const filters = useSelector<AppStateType, FiltersObjectType>(state => state.users.filters)


	const dispatch = useDispatch()
	const toggleFilterDispatch = (filterName: FilterNames, filtersBlockName: string) => {
		dispatch(toggleFilter(filterName, filtersBlockName))
	}

	useEffect(() => {
		dispatch(getUsersFromServer())
	}, []);

	return (
		<Forecasters
			users={users}
			filters={filters}
			toggleFilter={toggleFilterDispatch}
		/>
	)
}

export default UsersContainer;