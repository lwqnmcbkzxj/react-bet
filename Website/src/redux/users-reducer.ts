import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'

import { timeFilterEnum, sportTypeFilterEnum, FiltersObjectType, }from '../types/filters'

import { UserType } from '../types/users'

const TOGGLE_FILTER = 'users/TOGGLE_FILTER'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const SET_USERS = 'users/SET_USERS'

let initialState = {
	users: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}] as Array<UserType>,
	filters: {
		timeFilter: [
			{index: 1, name: timeFilterEnum.allTime, visibleText: 'Все время', active: true},
			{index: 2, name: timeFilterEnum.month, visibleText: 'Месяц', active: false},
		],
		
		sportTypeFilter: [
			{ index: 1, name: sportTypeFilterEnum.allSports, visibleText: 'Все', active: true },
			{ index: 2, name: sportTypeFilterEnum.football, visibleText: 'Футбол', active: false },
			{ index: 3, name: sportTypeFilterEnum.tennis, visibleText: 'Теннис', active: false },
			{ index: 4, name: sportTypeFilterEnum.basketball, visibleText: 'Баскетбол', active: false },
			{ index: 5, name: sportTypeFilterEnum.hockey, visibleText: 'Хоккей', active: false },
			{ index: 6, name: sportTypeFilterEnum.another, visibleText: 'Другое', active: false },
		]
	} as FiltersObjectType,
	isFetching: false
}

type InitialStateType = typeof initialState;
type ActionsTypes =
	SetUsersType |
	ToggleFilterType |
	ToggleIsFetchingType;

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_USERS: {
			return {
				...state,
				users: [...action.users]
			}
		}
		case TOGGLE_FILTER: {
			let filters = state.filters[action.filtersBlockName];
			if (filters) {
				filters.map(filter => {
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
	filterName: timeFilterEnum | sportTypeFilterEnum
	filtersBlockName: keyof FiltersObjectType
}
type ToggleIsFetchingType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
}
export const getUsersFromServer = (): ThunksType => async (dispatch) => {

	dispatch(toggleIsFetching(true))
	// let response = await usersAPI.getForecast(id)	
	setTimeout(() => { dispatch(toggleIsFetching(false)) }, 2000)
	

	// dispatch(setUsers(response))
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

type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export default usersReducer;