import { RootReducerType } from '../redux/redux-store'

export type AppStateType = ReturnType<RootReducerType>

/* LIVE COMMENTS */
export type CommentType = {
	userId: number
	userName: string
	userImg: string
	id: number
	text: string
	articleName: string
	articleId: number
	publishDate: number
}
/* LIVE COMMENTS */



/* FORECAST TYPES */
export enum timeFilterEnum  {
	allTime = 'allTime',
	period_3_hours = '3 hours',
	period_6_hours = '6 hours',
	period_12_hours = '12 hours',
	period_24_hours = '24 hours',
}
export enum subscribtionFilterEnum  {
	allForecasts = 'allForesacts',
	mySubscribtions = 'mySubscribtions',
	prepaid = 'prepaid'
}

export enum sportTypeFilterEnum  {
	allSports = 'allSports',
	football = 'football',
	tennis = 'tennis',
	basketball = 'basketball',
	hockey = 'hockey',
	another = 'another',
}

export type FilterType = {
	index: number
	name: timeFilterEnum | subscribtionFilterEnum | sportTypeFilterEnum
	visibleText: string
	active: boolean
}

export type ForecastFiltersType = {
	timeFilter: Array<FilterType>
	subscribtionFilter: Array<FilterType>
	sportTypeFilter: Array<FilterType>
}

export type ForecastType = {
	
}

/* FORECAST TYPES */
