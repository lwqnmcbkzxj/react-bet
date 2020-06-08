import { SportType } from "./types"

export enum timeFilterEnum {
	allTime = '0',
	period_3_hours = '3',
	period_6_hours = '6',
	period_12_hours = '12',
	period_24_hours = '24',
	month = '744'
}
export enum subscriptionFilterEnum {
	allForecasts = 'allForesacts',
	mySubscriptions = 'mySubscriptions',
	prepaid = 'prepaid'
}

export const setSportFiltersEnum = (sports: Array<SportType>) => {
	// sportTypeFilterEnum.allSports = "asdas"
 }

export const sportTypeFilterEnum = {
	// allSports: '0',
	// football: '1',
	// tennis: '2',
	// basketball: '3',
	// hockey: '4',
	// another: '5',
} as any


export type FilterType = {
	index: number
	name: timeFilterEnum | subscriptionFilterEnum | typeof sportTypeFilterEnum
	visibleText: string
	active: boolean
}

export type FiltersObjectType = {
	timeFilter?: Array<FilterType>
	subscriptionFilter?: Array<FilterType>
	sportTypeFilter?: Array<SportType>
}


export type FilterNames = timeFilterEnum | typeof sportTypeFilterEnum | subscriptionFilterEnum | languageEnum

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
