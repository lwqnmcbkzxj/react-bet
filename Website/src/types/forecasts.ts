/* FORECAST TYPES */
export enum timeFilterEnum {
	allTime = 'all',
	period_3_hours = '3h',
	period_6_hours = '6h',
	period_12_hours = '12h',
	period_24_hours = 'day',
}
export enum subscribtionFilterEnum {
	allForecasts = 'allForesacts',
	mySubscribtions = 'mySubscribtions',
	prepaid = 'prepaid'
}

export enum sportTypeFilterEnum {
	allSports = 'all',
	football = '1',
	tennis = '2',
	basketball = '3',
	hockey = '4',
	another = '5',
}

export type FilterType = {
	index: number
	name: timeFilterEnum | subscribtionFilterEnum | sportTypeFilterEnum
	visibleText: string
	active: boolean
}

export type ForecastsFiltersType = {
	timeFilter: Array<FilterType>
	subscribtionFilter: Array<FilterType>
	sportTypeFilter: Array<FilterType>
}

export type ForecastType = {
	UserName: string
	UserAvatar: string
	SportName: string
	Tournament: string
	ForecastId: number
	Time: string
	Text: string
	BetValue: number
	CratedAt: string
	Coefficient: number
	CommentsQuanity: number
	Comments: Array<any>
	FavAmmount: number
	Rating: number
}

/* FORECAST TYPES */