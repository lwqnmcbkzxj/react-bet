/* FORECAST TYPES */
export enum timeFilterEnum {
	allTime = 'allTime',
	period_3_hours = '3 hours',
	period_6_hours = '6 hours',
	period_12_hours = '12 hours',
	period_24_hours = '24 hours',
}
export enum subscribtionFilterEnum {
	allForecasts = 'allForesacts',
	mySubscribtions = 'mySubscribtions',
	prepaid = 'prepaid'
}

export enum sportTypeFilterEnum {
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
}

/* FORECAST TYPES */