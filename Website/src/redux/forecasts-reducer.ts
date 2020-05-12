import { AppStateType } from '../types/types'

import { ForecastType } from '../types/forecasts'
import { timeFilterEnum, subscribtionFilterEnum, sportTypeFilterEnum, FilterNames, FiltersObjectType } from '../types/filters'

import { ThunkAction } from 'redux-thunk'
import { forecastsAPI } from '../api/api'

const TOGGLE_IS_FETCHING = 'forecasts/TOGGLE_IS_FETCHING'
const TOGGLE_FILTER = 'forecasts/TOGGLE_FILTER'
const SET_FORECASTS = 'forecasts/SET_FORECASTS'
const SET_FORECAST = 'forecasts/SET_FORECAST'


let initialState = {
	forecasts: [{}, {}, {}, {}, {}] as Array<ForecastType>,
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
	} as FiltersObjectType,
	currentForecast: {} as ForecastType,
	isFetching: false
}

type InitialStateType = typeof initialState;
type ActionsTypes =
	ToggleFilterType |
	SetForecastsType |
	SetForecastType |
	ToggleIsFetchingType;

const forecastsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_FORECASTS: {
			return {
				...state,
				forecasts: action.forecasts
			}
		}
		case SET_FORECAST: {
			return {
				...state,
				currentForecast: action.forecast
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

type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

type ToggleFilterType = {
	type: typeof TOGGLE_FILTER
	filterName: FilterNames
	filtersBlockName: keyof FiltersObjectType
}
type SetForecastsType = {
	type: typeof SET_FORECASTS
	forecasts: Array<ForecastType>
}
type SetForecastType = {
	type: typeof SET_FORECAST
	forecast: ForecastType
}
type ToggleIsFetchingType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
}



export const getForecastsFromServer = (page: number, quanity: number, options = {} as any): ThunksType => async (dispatch) => {	
	dispatch(toggleIsForecastsFetching(true))
	let response = await forecastsAPI.getForecasts(page, quanity, options)
	dispatch(toggleIsForecastsFetching(false))
	dispatch(setForecasts(response))
}

export const getForecastFromServer = (id: number): ThunksType => async (dispatch) => {

	dispatch(toggleIsForecastsFetching(true))
	let response = await forecastsAPI.getForecast(id)	
	dispatch(toggleIsForecastsFetching(false))

	dispatch(setForecast(response))
}

export const setForecasts = (forecasts: Array<ForecastType>): SetForecastsType => {
	return {
		type: SET_FORECASTS,
		forecasts
	}
}
export const setForecast = (forecast: ForecastType): SetForecastType => {
	return {
		type: SET_FORECAST,
		forecast
	}
}




export const toggleFilter = (filterName: FilterNames, filtersBlockName: string) => {
	return {
		type: TOGGLE_FILTER,
		filterName, 
		filtersBlockName
	}
}

export const toggleIsForecastsFetching = (isFetching: boolean): ToggleIsFetchingType => {
	return {
		type: TOGGLE_IS_FETCHING,
		isFetching
	}
}

export const rateForecast = (id: number, type: number): ThunksType => async (dispatch) => {
	if (type === 1) {
		let response = await forecastsAPI.likeForecast(id)	
	} else if (type === 2){
		let response = await forecastsAPI.dislikeForecast(id)	
	}
}
export const favouriteForecast = (id: number): ThunksType => async (dispatch) =>{
	let response = await forecastsAPI.favouriteForecast(id)	
}

export default forecastsReducer;