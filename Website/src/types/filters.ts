export enum timeFilterEnum {
	allTime = 'all',
	period_3_hours = '3h',
	period_6_hours = '6h',
	period_12_hours = '12h',
	period_24_hours = 'day',
	month = 'month'
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

export type FiltersObjectType = {
	timeFilter?: Array<FilterType>
	subscribtionFilter?: Array<FilterType>
	sportTypeFilter?: Array<FilterType>
}


export type FilterNames = timeFilterEnum | sportTypeFilterEnum | subscribtionFilterEnum | languageEnum

export enum languageEnum {
	rus = 'rus',
	eng = 'eng',
}

export type LanguageType = {
	index: number
	name: languageEnum,
	visibleText: string
	active: boolean
}
