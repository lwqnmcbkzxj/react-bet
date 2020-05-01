import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'

import { UserType } from '../types/user'
import { timeFilterEnum, FiltersObjectType, FilterNames } from '../types/filters'


const TOGGLE_FILTER = 'users/TOGGLE_FILTER'

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
type ActionsTypes = ToggleFilterType;

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

		default:
			return state;
	}
}



type ToggleFilterType = {
	type: typeof TOGGLE_FILTER
	filterName: FilterNames
	filtersBlockName: keyof FiltersObjectType
}
export const toggleFilter = (filterName: FilterNames, filtersBlockName: any): ToggleFilterType => {
	return {
		type: TOGGLE_FILTER,
		filterName,
		filtersBlockName
	}
}


type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export default usersReducer;