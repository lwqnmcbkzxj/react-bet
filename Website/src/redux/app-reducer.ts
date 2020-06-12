import { AppStateType, ShortDataElementType } from '../types/types'
import { languageEnum, LanguageType } from '../types/filters'
import { ThunkAction } from 'redux-thunk'
import { SportType } from '../types/types'
import { appAPI } from '../api/api'

import { showAlert } from '../utils/showAlert'
import { stopSubmit } from 'redux-form'
import { OptionsType, BannerType } from '../types/types'

const TOGGLE_AUTH_FORM_VISIBILITY = 'app/TOGGLE_AUTH_FORM_VISIBILITY'
const TOGGLE_COMMENTS_BLOCK_VISIBILITY = 'app/TOGGLE_COMMENTS_BLOCK_VISIBILITY'
const CHANGE_MAIN_PAGE_BLOCK_VISIBILITY = 'app/CHANGE_MAIN_PAGE_BLOCK_VISIBILITY'
const SET_MAIN_PAGE_BLOCKS_VISIBILITY = 'app/SET_MAIN_PAGE_BLOCKS_VISIBILITY'
const CHANGE_LANGUAGE = 'app/CHANGE_LANGUAGE'
const SET_REDIRECT_LINK = 'app/SET_REDIRECT_LINK'
const SET_SHOULD_REDIRECT = 'app/SET_SHOULD_REDIRECT'
const CHANGE_USER_PAGE_TAB = 'app/CHANGE_USER_PAGE_TAB'

const SET_SPORTS = 'app/SET_SPORTS'
const SET_POLICY = 'app/SET_POLICY'
const SET_TERMS = 'app/SET_TERMS'
const SET_OPTIONS = 'app/SET_OPTIONS'
const SET_BANNERS = 'app/SET_BANNERS'

const SET_PAGINATION_LIMIT = 'app/SET_PAGINATION_LIMIT'
const SET_PAGINATION_PAGE = 'app/SET_PAGINATION_PAGE'
const SET_PAGINATION_TOTAL_COUNT = 'app/SET_PAGINATION_TOTAL_COUNT'

const SET_SHORT_DATA = 'app/SET_SHORT_DATA'



let initialState = {
	redirectLink: "",
	shouldRedirect: false,
	isAuthFormVisible: false,
	isCommentsBlockVisible: true,
	mainPageBlocksVisibility: {} as any,
	activeProfileTab: "forecasts",
	languages: [
		{ index: 1, name: languageEnum.rus, visibleText: 'Русский', active: true },
		{ index: 2, name: languageEnum.eng, visibleText: 'English', active: false },
	],
	sports: [] as Array<SportType>,
	policy: "",
	terms: "",
	options: {} as OptionsType,
	banners: [] as Array<BannerType>,
	paginationObject: {
		forecasts: { totalCount: 0, page: 1, limit: 5 },
		articles: { totalCount: 0, page: 1, limit: 5 },
		users: { totalCount: 0, page: 1, limit: 15 },
		bookmakers: { totalCount: 0, page: 1, limit: 15 },
		matches: { totalCount: 0, page: 1, limit: 15 },
		news: { totalCount: 0, page: 1, limit: 15 },
	},
	shortData: {
		users: [] as Array<ShortDataElementType>,
		events: [] as Array<ShortDataElementType>,
		championships: [] as Array<ShortDataElementType>,
		bookmakers: [] as Array<ShortDataElementType>,
	}
}

type InitialStateType = typeof initialState;
type ActionsTypes =
	SetRedirectLinkType |
	SetShouldRedirectType |
	ToggleAuthFormVisiblilityType |
	ToggleCommentsBlockVisibilityType |
	SetMainPageBlockVisibilityType |
	ChangeMainPageBlockVisibilityType |
	ChangeLanguageType |
	ChangeUserPageActiveTabType |
	SetPolicyType | SetTermsType |
	SetSportsType | SetOptionsType |
	SetPaginationLimitType | SetPaginationPageType | SetPaginationTotalCountType |
	SetBannersType |
	SetShortDataType;

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case TOGGLE_AUTH_FORM_VISIBILITY: {
			let value = !state.isAuthFormVisible
			if (action.value === false || action.value === true) {
				value = action.value
			}
			return {
				...state,
				isAuthFormVisible: value
			}
		}

		case TOGGLE_COMMENTS_BLOCK_VISIBILITY: {
			return {
				...state,
				isCommentsBlockVisible: !state.isCommentsBlockVisible
			}
		}

		case SET_MAIN_PAGE_BLOCKS_VISIBILITY: {
			let mainPageVisibility = localStorage.getItem('mainPageVisibility')
			if (mainPageVisibility) {
				mainPageVisibility = JSON.parse(mainPageVisibility)
			} else {
				let mainPageVisibilityNew = {} as any
				for (let blockName of action.blocksNames) {
					mainPageVisibilityNew[blockName] = true
				}

				localStorage.setItem('mainPageVisibility', JSON.stringify(mainPageVisibilityNew))
				mainPageVisibility = mainPageVisibilityNew
			}

			return {
				...state,
				mainPageBlocksVisibility: mainPageVisibility
			}
		}

		case CHANGE_MAIN_PAGE_BLOCK_VISIBILITY: {
			let mainPageVisibility = localStorage.getItem('mainPageVisibility') as any
			mainPageVisibility = JSON.parse(mainPageVisibility)

			mainPageVisibility[action.blockName] = !mainPageVisibility[action.blockName]
			localStorage.setItem('mainPageVisibility', JSON.stringify(mainPageVisibility))

			let customHiddenBlockForState = state.mainPageBlocksVisibility;
			customHiddenBlockForState[action.blockName] = !customHiddenBlockForState[action.blockName]


			return {
				...state,
				mainPageBlocksVisibility: customHiddenBlockForState
			}
		}

		case CHANGE_LANGUAGE: {
			let languages = state.languages;
			languages.map(language => {
				language.active = false
				if (language.name === action.language)
					language.active = true
			})

			return {
				...state,
				languages: [...languages]
			}
		}


		case SET_REDIRECT_LINK: {
			return {
				...state,
				redirectLink: action.redirectLink
			}
		}
		case SET_SHOULD_REDIRECT: {
			return {
				...state,
				shouldRedirect: action.shouldRedirect
			}
		}
		case CHANGE_USER_PAGE_TAB: {
			return {
				...state,
				activeProfileTab: action.tabName
			}
		}
		case SET_SPORTS: {
			return {
				...state,
				sports: action.sports
			}
		}
		case SET_POLICY: {
			return {
				...state,
				policy: action.policy
			}
		}
		case SET_TERMS: {
			return {
				...state,
				terms: action.terms
			}
		}
		case SET_OPTIONS: {
			return {
				...state,
				options: {...action.options}
			}	
		}
		case SET_PAGINATION_LIMIT: {
			let key = action.instanceName as "forecasts" | "articles" | "users" | "bookmakers"
			let instanceObject = state.paginationObject[key]
			return {
				...state,
				paginationObject: {
					...state.paginationObject,
					[key]: {
						...instanceObject,
						limit: action.limit
					}
				}
			}
		}
		case SET_PAGINATION_PAGE: {
			let key = action.instanceName as "forecasts" | "articles" | "users" | "bookmakers"
			let instanceObject = state.paginationObject[key]

			let page = instanceObject.page
			if (!action.isFetching && action.page !== page && instanceObject.totalCount > instanceObject.page * instanceObject.limit) {
				if (action.page === -1)
					page = instanceObject.page + 1
				else 
					page = action.page 
			}
			
			return {
				...state,
				paginationObject: {
					...state.paginationObject,
					[key]: {
						...instanceObject,
						page: page
					}
				}
			}
		}
		case SET_PAGINATION_TOTAL_COUNT: {
			let key = action.instanceName as "forecasts" | "articles" | "users" | "bookmakers"
			let instanceObject = state.paginationObject[key]
			return {
				...state,
				paginationObject: {
					...state.paginationObject,
					[key]: {
						...instanceObject,
						totalCount: action.totalCount
					}
				}
			}
		}
			
		case SET_BANNERS: {
			return {
				...state,
				banners: [...action.banners]
			}
		}
		case SET_SHORT_DATA: {
			let key = action.instanceName as "users" | "events" | "championships" | "bookmakers"
			return {
				...state,
				shortData: {
					...state.shortData,
					[key]:  [...action.data]
				}
			}
		}
		default:
			return state;
	}
}



type ToggleAuthFormVisiblilityType = {
	type: typeof TOGGLE_AUTH_FORM_VISIBILITY
	value?: boolean
}
type ToggleCommentsBlockVisibilityType = {
	type: typeof TOGGLE_COMMENTS_BLOCK_VISIBILITY
}
type SetMainPageBlockVisibilityType = {
	type: typeof SET_MAIN_PAGE_BLOCKS_VISIBILITY
	blocksNames: Array<string>
}
type ChangeMainPageBlockVisibilityType = {
	type: typeof CHANGE_MAIN_PAGE_BLOCK_VISIBILITY
	blockName: string
}
type ChangeLanguageType = {
	type: typeof CHANGE_LANGUAGE
	language: languageEnum
}
type SetRedirectLinkType = {
	type: typeof SET_REDIRECT_LINK
	redirectLink: string
}
export type SetShouldRedirectType = {
	type: typeof SET_SHOULD_REDIRECT
	shouldRedirect: boolean
}
type ChangeUserPageActiveTabType = {
	type: typeof CHANGE_USER_PAGE_TAB
	tabName: string
}
type SetSportsType = {
	type: typeof SET_SPORTS
	sports: Array<SportType>
}
type SetPolicyType = {
	type: typeof SET_POLICY,
	policy: string
}
type SetTermsType = {
	type: typeof SET_TERMS,
	terms: string
}
type SetOptionsType = {
	type: typeof SET_OPTIONS, 
	options: OptionsType
}

type SetBannersType = {
	type: typeof SET_BANNERS,
	banners: Array<BannerType>
}

type SetShortDataType = {
	type: typeof SET_SHORT_DATA,
	data: Array<ShortDataElementType>
	instanceName: string
}

export type SetPaginationLimitType = {
	type: typeof SET_PAGINATION_LIMIT,
	limit: number
	instanceName: string
}
export type SetPaginationPageType = {
	type: typeof SET_PAGINATION_PAGE,
	page: number
	instanceName: string,
	isFetching: boolean
}
export type SetPaginationTotalCountType = {
	type: typeof SET_PAGINATION_TOTAL_COUNT,
	totalCount: number
	instanceName: string
}


export const initApp = (): ThunksType => async (dispatch) => {
	dispatch(getBanners())
	dispatch(getOptions())
	dispatch(getSportsFromServer())
	dispatch(getPolicy())
	dispatch(getTerms())
}


export const toggleAuthFormVisiblility = (value?: boolean): ToggleAuthFormVisiblilityType => {
	return {
		type: TOGGLE_AUTH_FORM_VISIBILITY,
		value
	}
}
export const toggleCommentsBlockVisibility = (): ToggleCommentsBlockVisibilityType => {
	return {
		type: TOGGLE_COMMENTS_BLOCK_VISIBILITY
	}
}
export const setMainPageBlocksVisibility = (blocksNames: Array<string>): SetMainPageBlockVisibilityType => {
	return {
		type: SET_MAIN_PAGE_BLOCKS_VISIBILITY,
		blocksNames
	}
}
export const changeMainPageBlockVisibility = (blockName: string): ChangeMainPageBlockVisibilityType => {
	return {
		type: CHANGE_MAIN_PAGE_BLOCK_VISIBILITY,
		blockName
	}
}

export const changeLanguage = (language: languageEnum): ChangeLanguageType => {
	return {
		type: CHANGE_LANGUAGE,
		language
	}
}

export const changeUserPageActiveTab = (tabName: string): ChangeUserPageActiveTabType => {
	return {
		type: CHANGE_USER_PAGE_TAB,
		tabName
	}
}


export const setRedirectLink = (redirectLink: string): SetRedirectLinkType => {
	return {
		type: SET_REDIRECT_LINK,
		redirectLink
	}
}
export const setShouldRedirect = (shouldRedirect: boolean): SetShouldRedirectType => {
	return {
		type: SET_SHOULD_REDIRECT,
		shouldRedirect
	}
}
const setSports = (sports: Array<SportType>): ThunksType => async (dispatch) => {
	let customSports = [{ id: 0, index: 0, name: 0, visibleText: 'Все', active: true, image: '' }] as Array<SportType>
	sports.map((sport, index = 1) => {
		customSports.push({
			id: sport.id,
			index: index,
			name: sport.id,
			visibleText: sport.name,
			active: false,
			image: sport.image
		})
	})

	dispatch({
		type: SET_SPORTS,
		sports: customSports
	})
	
}

export const getSportsFromServer = (): ThunksType => async (dispatch) => {
	let response = await appAPI.getSports()

	dispatch(setSports(response))
}

export const sendEmail = (email: string, text: string): ThunksType => async (dispatch) => {
	let response = await appAPI.sendEmail(email, text)

	showAlert('success', 'Письмо успешно отправлено')
	dispatch(stopSubmit("feedback", { _error: '' }))
}

export const getPolicy = (): ThunksType => async (dispatch) => {
	let response = await appAPI.getPolicy()
	dispatch(setPolicy(response.text))
}
const setPolicy = (policy: string): SetPolicyType => {
	return {
		type: SET_POLICY,
		policy
	}
}
export const getTerms = (): ThunksType => async (dispatch) => {
	let response = await appAPI.getTerms()
	dispatch(setTerms(response.text))
}
const setTerms = (terms: string): SetTermsType => {
	return {
		type: SET_TERMS,
		terms
	}
}

export const getOptions = (): ThunksType => async (dispatch) => {
	let response = await appAPI.getOptions()
	dispatch(setOptions(response))
}
const setOptions = (options: OptionsType): SetOptionsType => {
	return {
		type: SET_OPTIONS,
		options
	}
}


export const setPaginationLimitType = (limit: number, instanceName: string): SetPaginationLimitType => {
	return {
		type: SET_PAGINATION_LIMIT,
		limit,
		instanceName
	}
}
export const setPaginationPage = (page: number, instanceName: string): ThunksType => async (dispatch, getState) => { 
	let isFetching = getState()[instanceName as "forecasts" | "articles" | "users" | "bookmakers"].isFetching

	dispatch({
		type: SET_PAGINATION_PAGE,
		page,
		instanceName,
		isFetching
	})
}
export const setPaginationTotalCount = (totalCount: number, instanceName: string): SetPaginationTotalCountType => { 
	return {
		type: SET_PAGINATION_TOTAL_COUNT,
		totalCount,
		instanceName
	}
}


export const getBanners = (): ThunksType => async (dispatch) => {
	let response = await appAPI.getBanners()
	dispatch(setBanners(response.data))
}
const setBanners = (banners: Array<BannerType>): SetBannersType => {
	return {
		type: SET_BANNERS,
		banners,
	}
}

export const getShortData = (instanceName: string): ThunksType => async (dispatch) => {
	let response = await appAPI.getShortData(instanceName)
	dispatch(setShortData(response, instanceName))
}
const setShortData = (data: Array<ShortDataElementType>, instanceName: string): SetShortDataType => {
	return {
		type: SET_SHORT_DATA,
		data,
		instanceName
	}
}


type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export default appReducer;