export enum timeFilterEnum {
	allTime = '0',
	period_3_hours = '3',
	period_6_hours = '6',
	period_12_hours = '12',
	period_24_hours = '24',
	month = '720'
}
export enum subscribtionFilterEnum {
	allForecasts = 'allForesacts',
	mySubscribtions = 'mySubscribtions',
	prepaid = 'prepaid'
}

export enum sportTypeFilterEnum {
	allSports = '0',
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
