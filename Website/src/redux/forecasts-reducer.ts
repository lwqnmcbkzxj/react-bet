import { AppStateType, CommentType } from '../types/types'

import { ForecastType } from '../types/forecasts'
import { timeFilterEnum, subscriptionFilterEnum, sportTypeFilterEnum, FilterNames, FiltersObjectType, FilterType } from '../types/filters'
import { SportType } from '../types/types'

import { ThunkAction } from 'redux-thunk'
import { forecastsAPI, appAPI } from '../api/api'

import { setPaginationTotalCount, SetPaginationTotalCountType } from './app-reducer'

const TOGGLE_IS_FETCHING = 'forecasts/TOGGLE_IS_FETCHING'
const TOGGLE_FILTER = 'forecasts/TOGGLE_FILTER'
const SET_FORECASTS = 'forecasts/SET_FORECASTS'
const SET_FORECAST = 'forecasts/SET_FORECAST'
const SET_SPORTS = 'app/SET_SPORTS'
const SET_FORECAST_COMMENTS = 'forecasts/SET_FORECAST_COMMENTS'

let initialState = {
	forecasts: [{}, {}, {}, {}, {}] as Array<ForecastType>,
	filters: {
		timeFilter: [
			{ index: 1, name: timeFilterEnum.allTime, visibleText: 'Все время', active: true },
			{ index: 2, name: timeFilterEnum.period_3_hours, visibleText: '3 часа', active: false },
			{ index: 3, name: timeFilterEnum.period_6_hours, visibleText: '6 часов', active: false },
			{ index: 4, name: timeFilterEnum.period_12_hours, visibleText: '12 часов', active: false },
			{ index: 5, name: timeFilterEnum.period_24_hours, visibleText: '24 часа', active: false },
		],
		subscriptionFilter: [
			{ index: 1, name: subscriptionFilterEnum.mySubscriptions, visibleText: 'Подписки', active: false },
			{ index: 2, name: subscriptionFilterEnum.allForecasts, visibleText: 'Все прогнозы', active: true },
			// { index: 3, name: subscriptionFilterEnum.prepaid, visibleText: 'Платные', active: false },
		],
		sportTypeFilter: []

	} as FiltersObjectType,
	currentForecast: {} as ForecastType,
	isFetching: false,
}

type InitialStateType = typeof initialState;
type ActionsTypes =
	ToggleFilterType |
	SetForecastsType |
	SetForecastType |
	SetForecastComments |
	ToggleIsFetchingType |
	SetForecastsSportsType |
	SetPaginationTotalCountType;

const forecastsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_FORECASTS: {
			let forecasts = action.forecasts
			if (action.getMore) 
				forecasts = [...state.forecasts, ...forecasts]

			return {
				...state,
				forecasts: [...forecasts]
			}
		}
		case SET_FORECAST: {
			return {
				...state,
				currentForecast: action.forecast
			}
		}
		case SET_FORECAST_COMMENTS: {
			return {
				...state,
				currentForecast: {
					...state.currentForecast,
					comments: [...action.comments]
				}
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
				filters: { ...state.filters, [action.filtersBlockName]: filters }
			}
		}

		case TOGGLE_IS_FETCHING: {
			return {
				...state,
				isFetching: action.isFetching
			}
		}
		
		case SET_SPORTS: {
			let filters = state.filters
			if (action.sports.length > 0) {
				// Copying object cuz in object in action and object in users filters are equals. If you will change forecast filter -> user filter fill change too
				let sportsCopy = [] as any
				for (let sport of action.sports) {
					sportsCopy.push({ ...sport })
				}
				filters.sportTypeFilter = [...sportsCopy]
			}
			return {
				...state,
				filters: { ...filters }
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
	getMore?: boolean
}
type SetForecastType = {
	type: typeof SET_FORECAST
	forecast: ForecastType
}
type ToggleIsFetchingType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
}

type SetForecastComments = {
	type: typeof SET_FORECAST_COMMENTS,
	id: number
	comments: Array<CommentType>
}


export type SetForecastsSportsType = {
	type: typeof SET_SPORTS
	sports: Array<SportType>
}


export const getForecastsFromServer = (page: number, limit: number, options = {} as any): ThunksType => async (dispatch, getState) => {
	dispatch(toggleIsForecastsFetching(true))
	let response

	if (options.favourites)
		response = await forecastsAPI.getFavouriteForecasts(page, limit)
	else if (options.subscribtion === "mySubscriptions" && options.loggedUserId) 
		response = await forecastsAPI.getForecastsBySubscribtions(page, limit, options)
	else if (options.userId)
		response = await forecastsAPI.getUserForecasts(page, limit, options.userId)
	else
		response = await forecastsAPI.getForecasts(page, limit, options)

	dispatch(toggleIsForecastsFetching(false))
	dispatch(setForecasts(response.data, page !== 1))
	dispatch(setPaginationTotalCount(response.meta.total, 'forecasts'))
}

export const getForecastFromServer = (id: number): ThunksType => async (dispatch) => {

	dispatch(toggleIsForecastsFetching(true))
	let response = await forecastsAPI.getForecast(id)
	dispatch(toggleIsForecastsFetching(false))

	dispatch(setForecast(response))
}

const setForecasts = (forecasts: Array<ForecastType>, getMore?: boolean): SetForecastsType => {
	return {
		type: SET_FORECASTS,
		forecasts,
		getMore
	}
}
const setForecast = (forecast: ForecastType): SetForecastType => {
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
	} else if (type === 2) {
		let response = await forecastsAPI.dislikeForecast(id)
	}
}
export const favouriteForecast = (id: number): ThunksType => async (dispatch) => {
	let response = await forecastsAPI.favouriteForecast(id)
}

export const getForecastComments = (id: number, filterName: string): ThunksType => async (dispatch) => {
	let response = await appAPI.comments.getComments(id, 'forecasts', filterName)

	dispatch({
		type: SET_FORECAST_COMMENTS,
		id,
		comments: response
	})
}



export default forecastsReducer;