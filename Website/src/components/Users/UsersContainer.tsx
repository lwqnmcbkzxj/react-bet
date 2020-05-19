import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import { FilterNames, FiltersObjectType } from '../../types/filters'
import { UserType } from '../../types/users'
import Forecasters from './Users'
import { toggleFilter } from '../../redux/users-reducer'
import { withRouter, RouteComponentProps } from 'react-router'
import { getUsersFromServer } from '../../redux/users-reducer'
import { getActiveFilter } from '../../utils/getActiveFilter'
const UsersContainer: FC = ({ ...props }) => {
	const users = useSelector<AppStateType, Array<UserType>>(state => state.users.users)
	const filters = useSelector<AppStateType, FiltersObjectType>(state => state.users.filters)
	const dispatch = useDispatch()
	const toggleFilterDispatch = (filterName: FilterNames, filtersBlockName: string) => {
		dispatch(toggleFilter(filterName, filtersBlockName))
	}

	let activeSportFilter = getActiveFilter(filters, 'sportTypeFilter')
	let activeTimeFilter = 	getActiveFilter(filters, 'timeFilter')

	let options = {
		sport: activeSportFilter,
		time: activeTimeFilter
	}

	useEffect(() => {
		dispatch(getUsersFromServer(1, 15, options))		
	}, [filters]);


	return (
		<Forecasters
			users={users}
			filters={filters}
			toggleFilter={toggleFilterDispatch}
		/>
	)
}

export default UsersContainer;