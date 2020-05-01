import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'

import { timeFilterEnum, sportTypeFilterEnum, FiltersObjectType, }from '../types/filters'

import { UserType } from '../types/users'

const TOGGLE_FILTER = 'users/TOGGLE_FILTER'

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
	currentUser: {	},
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
				filters: { ...state.filters, [action.filtersBlockName]: filters  }
			}
		}

		default:
			return state;
	}
}



type ToggleFilterType = {
	type: typeof TOGGLE_FILTER
	filterName: timeFilterEnum | sportTypeFilterEnum
	filtersBlockName: keyof FiltersObjectType
}
export const toggleFilter = (filterName: string, filtersBlockName: string) => {
	return {
		type: TOGGLE_FILTER,
		filterName, 
		filtersBlockName
	}
}


type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export default usersReducer;