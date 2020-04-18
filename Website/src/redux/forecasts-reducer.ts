import {
	AppStateType,
	ForecastType,
	timeFilterEnum,
	subscribtionFilterEnum,
	sportTypeFilterEnum,
	ForecastFiltersType
} from '../types/types'
import { ThunkAction } from 'redux-thunk'


const TOGGLE_FILTER = 'forecasts/TOGGLE_FILTER'


let initialState = {
	forecasts: [
		{ },
		{ },
		{ },
		{ },
		{ },
		{ },
		{ },
		{ },
		{ },
		{ },
		{ },
		{ },
		{ },
		{ },
		{ },
	] as Array<ForecastType>,
	filters: {
		timeFilter: [
			{index: 1, name: timeFilterEnum.allTime, visibleText: 'Все время', active: true},
			{index: 2, name: timeFilterEnum.period_3_hours, visibleText: '3 часа', active: false},
			{index: 3, name: timeFilterEnum.period_6_hours, visibleText: '6 часов', active: false},
			{index: 4, name: timeFilterEnum.period_12_hours, visibleText: '12 часов', active: false},
			{index: 5, name: timeFilterEnum.period_24_hours, visibleText: '24 часа', active: false},
		],
		subscribtionFilter: [
			{index: 1, name: subscribtionFilterEnum.mySubscribtions, visibleText: 'Подписки', active: false},
			{index: 2, name: subscribtionFilterEnum.allForecasts, visibleText: 'Все прогнозы', active: true},
			{index: 3, name: subscribtionFilterEnum.prepaid, visibleText: 'Платные', active: false},
		],
		sportTypeFilter: [
			{ index: 1, name: sportTypeFilterEnum.allSports, visibleText: 'Все', active: true },
			{ index: 2, name: sportTypeFilterEnum.football, visibleText: 'Футбол', active: false },
			{ index: 3, name: sportTypeFilterEnum.tennis, visibleText: 'Теннис', active: false },
			{ index: 4, name: sportTypeFilterEnum.basketball, visibleText: 'Баскетбол', active: false },
			{ index: 5, name: sportTypeFilterEnum.hockey, visibleText: 'Хоккей', active: false },
			{ index: 6, name: sportTypeFilterEnum.another, visibleText: 'Другое', active: false },
		]
	} as ForecastFiltersType
}

type InitialStateType = typeof initialState;
type ActionsTypes = ToggleFilterType;

const forecastsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case TOGGLE_FILTER: {
			let filters = state.filters[action.filtersBlockName];
			filters.map(filter => {
				filter.active = false
				if (filter.name === action.filterName)
					filter.active = true
			})
			
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
	filterName: timeFilterEnum | subscribtionFilterEnum | sportTypeFilterEnum
	filtersBlockName: keyof ForecastFiltersType
}
export const toggleFilter = (filterName: string, filtersBlockName: string) => {
	return {
		type: TOGGLE_FILTER,
		filterName, 
		filtersBlockName
	}
}


type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export default forecastsReducer;