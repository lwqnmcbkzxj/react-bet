import { AppStateType, SportType } from '../types/types'
import { ThunkAction } from 'redux-thunk'
import { timeFilterEnum, FiltersObjectType, FilterType }from '../types/filters'

import { UserType } from '../types/users'
import { usersAPI } from '../api/api'
import { useSelector } from 'react-redux'
import { setPaginationTotalCount, SetPaginationTotalCountType } from './app-reducer'

const TOGGLE_FILTER = 'users/TOGGLE_FILTER'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const SET_USERS = 'users/SET_USERS'
const SET_SPORTS = 'app/SET_SPORTS'

let initialState = {
	users: [{}, {}, {}, {}, {}] as Array<UserType>,
	filters: {
		timeFilter: [
			{index: 1, name: timeFilterEnum.allTime, visibleText: 'Все время', active: false},
			{index: 2, name: timeFilterEnum.month, visibleText: 'Месяц', active: true},
		],
		sportTypeFilter: []
	} as FiltersObjectType,
	isFetching: false
}

type InitialStateType = typeof initialState;
type ActionsTypes =
	SetUsersType |
	ToggleFilterType |
	ToggleIsFetchingType |
	SetUsersSportsType | SetPaginationTotalCountType;

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_USERS: {
			let users = action.users
			if (action.getMore) 
				users = [...state.users, ...users]
			return {
				...state,
				users: [...users]
			}
		}
		case TOGGLE_FILTER: {
			let filters = [] as any
			filters = state.filters[action.filtersBlockName] as FilterType[] | SportType[];
			if (filters) {
				filters.map((filter: { active: boolean; name: any }) => {
					filter.active = false
					if (filter.name === action.filterName)
						filter.active = true
				})
			}			
			return {
				...state,
				filters: { ...state.filters, [action.filtersBlockName]: filters  }
			}
		}
		case TOGGLE_IS_FETCHING: {
			return {
				...state,
				isFetching: action.isFetching
			}
		}
		case SET_SPORTS: {
			let filters = {...state.filters}
			if (action.sports.length > 0) {
				let sportsCopy = [] as any
				for (let sport of action.sports) {
					sportsCopy.push({...sport})
				}
				
				filters.sportTypeFilter = [...sportsCopy]
			}
			return {
				...state,
				filters: {...filters}
			}
		}

		default:
			return state;
	}
}

type SetUsersType = {
	type: typeof SET_USERS
	users: Array<UserType>
	getMore?: boolean
}

type ToggleFilterType = {
	type: typeof TOGGLE_FILTER
	filterName: timeFilterEnum
	filtersBlockName: keyof FiltersObjectType
}
type ToggleIsFetchingType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
}

export type SetUsersSportsType = {
	type: typeof SET_SPORTS
	sports: Array<SportType>
}

export const getUsersFromServer = (page: number, limit: number, options = {} as any): ThunksType => async (dispatch) => {	
	if (page === 1)
		dispatch(toggleIsFetching(true))
	
	let response = await usersAPI.getUsers(page, limit, options)	
	if (page === 1)
		dispatch(toggleIsFetching(false))
	
	dispatch(setPaginationTotalCount(response.meta.total, 'users'))
	dispatch(setUsers(response.data, page !== 1))
}

export const setUsers = (users: Array<UserType>, getMore?: boolean): SetUsersType => {
	return {
		type: SET_USERS,
		users,
		getMore
	}
}


export const toggleFilter = (filterName: string, filtersBlockName: string) => {
	return {
		type: TOGGLE_FILTER,
		filterName, 
		filtersBlockName
	}
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => {
	return {
		type: TOGGLE_IS_FETCHING,
		isFetching
	}
}
// export const setUsersSports = (sports: Array<SportType>): SetUsersSportsType => {
// 	return {
// 		type: SET_SPORTS,
// 		sports
// 	}
// }

type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export default usersReducer;