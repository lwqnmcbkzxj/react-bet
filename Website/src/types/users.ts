
export enum sportTypeFilterEnum  {
	allSports = 'allSports',
	football = 'football',
	tennis = 'tennis',
	basketball = 'basketball',
	hockey = 'hockey',
	another = 'another',
}

export enum timeFilterEnum  {
	allTime = 'allTime',
	month = 'month',
}

export type FilterType = {
	index: number
	name: timeFilterEnum | sportTypeFilterEnum
	visibleText: string
	active: boolean
}

export type UsersFiltersType = {
	timeFilter: Array<FilterType>
	sportTypeFilter: Array<FilterType>
}

export type UserType = {
	
}