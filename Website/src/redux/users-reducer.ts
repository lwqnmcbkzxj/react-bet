import { AppStateType, SportType } from '../types/types'
import { ThunkAction } from 'redux-thunk'
import { timeFilterEnum, sportTypeFilterEnum, FiltersObjectType, FilterType }from '../types/filters'

import { UserType } from '../types/users'
import { usersAPI } from '../api/api'
import { useSelector } from 'react-redux'

const TOGGLE_FILTER = 'users/TOGGLE_FILTER'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const SET_USERS = 'users/SET_USERS'
const SET_SPORTS = 'app/SET_SPORTS'

let initialState = {
	users: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}] as Array<UserType>,
	filters: {
		timeFilter: [
			{index: 1, name: timeFilterEnum.allTime, visibleText: 'Все время', active: true},
			{index: 2, name: timeFilterEnum.month, visibleText: 'Месяц', active: false},
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
	SetUsersSportsType;

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_USERS: {
			return {
				...state,
				users: [...action.users]
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
}

type ToggleFilterType = {
	type: typeof TOGGLE_FILTER
	filterName: timeFilterEnum | typeof sportTypeFilterEnum
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

export const getUsersFromServer = (page: number, quanity: number, options = {} as any): ThunksType => async (dispatch) => {		
	dispatch(toggleIsFetching(true))
	let response = await usersAPI.getUsers(page, quanity, options)	
	dispatch(toggleIsFetching(false))
	
	dispatch(setUsers(response.data))
}

export const setUsers = (users: Array<UserType>): SetUsersType => {
	return {
		type: SET_USERS,
		users
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