import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'
import { UserType } from '../types/user'
import { timeFilterEnum, FiltersObjectType, FilterNames } from '../types/filters'
import { usersAPI } from '../api/api'


const TOGGLE_FILTER = 'user/TOGGLE_FILTER'
const SET_USER = 'user/SET_USER'

let initialState = {
	filters: {
		timeFilter: [
			{ index: 1, name: timeFilterEnum.allTime, visibleText: 'Все время', active: false },
			{ index: 2, name: timeFilterEnum.month, visibleText: 'Месяц', active: true },
		]
	} as FiltersObjectType,
	currentUser: {} as UserType,
}

type InitialStateType = typeof initialState;
type ActionsTypes = ToggleFilterType | SetUserType;

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
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
				filters: { ...state.filters, [action.filtersBlockName]: filters }
			}
		}
		case SET_USER: {
			return {
				...state,
				currentUser: {...action.user}
			}
		}
		default:
			return state;
	}
}



type ToggleFilterType = {
	type: typeof TOGGLE_FILTER
	filterName: FilterNames
	filtersBlockName: keyof FiltersObjectType
}
type SetUserType = {
	type: typeof SET_USER
	user: UserType
}


export const toggleFilter = (filterName: FilterNames, filtersBlockName: any): ToggleFilterType => {
	return {
		type: TOGGLE_FILTER,
		filterName,
		filtersBlockName
	}
}

export const getUserFromServer = (id: number): ThunksType => async (dispatch) => {		
	debugger

	// dispatch(toggleIsFetching(true))
	let response = await usersAPI.getUser(id)	
	// dispatch(toggleIsFetching(false))
	dispatch(setUser(response))
}

export const setUser = (user: UserType): SetUserType => {
	return {
		type: SET_USER,
		user
	}
}

export const subscribeUser = (id: number): ThunksType => async (dispatch) => {
	let response = await usersAPI.subscribeUser(id)
}

type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export default usersReducer;