import { AppStateType } from '../types/types'
import { languageEnum, LanguageType } from '../types/filters'
import { ThunkAction } from 'redux-thunk'
import { SportType } from '../types/types'
import { appAPI } from '../api/api'



import { setUsersSports, SetUsersSportsType } from './users-reducer'
import { setForecastsSports, SetForecastsSportsType } from './forecasts-reducer'

const TOGGLE_AUTH_FORM_VISIBILITY = 'app/TOGGLE_AUTH_FORM_VISIBILITY'
const TOGGLE_COMMENTS_BLOCK_VISIBILITY = 'app/TOGGLE_COMMENTS_BLOCK_VISIBILITY'
const CHANGE_MAIN_PAGE_BLOCK_VISIBILITY = 'app/CHANGE_MAIN_PAGE_BLOCK_VISIBILITY'
const SET_MAIN_PAGE_BLOCKS_VISIBILITY = 'app/SET_MAIN_PAGE_BLOCKS_VISIBILITY'
const CHANGE_LANGUAGE = 'app/CHANGE_LANGUAGE'
const SET_REDIRECT_LINK = 'app/SET_REDIRECT_LINK'
const SET_SHOULD_REDIRECT = 'app/SET_SHOULD_REDIRECT'
const CHANGE_USER_PAGE_TAB = 'app/CHANGE_USER_PAGE_TAB'
const SET_SPORTS = 'app/SET_SPORTS'

let initialState = {
	redirectLink: "",
	shouldRedirect: false,
	isAuthFormVisible: false,
	isCommentsBlockVisible: true,
	mainPageBlocksVisibility: {} as any,
	activeProfileTab: "statistics",
	languages: [
		{ index: 1, name: languageEnum.rus, visibleText: 'Русский', active: true },
		{ index: 2, name: languageEnum.eng, visibleText: 'English', active: false },
	],
	sports: [] as Array<SportType>
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
	SetSportsType
	
	| SetUsersSportsType | SetForecastsSportsType;

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

export const initApp = (): ThunksType => async (dispatch) => {
	dispatch(getSportsFromServer())
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
	let customSports = [{ id: 1, index: 1, name: '0', visibleText: 'Все', active: true, img: '' }] as Array<SportType>
	sports.map((sport, index = 1) => {
		customSports.push({
			id: sport.id,
			index: index,
			name: sport.id,
			visibleText: sport.name,
			active: false,
			img: sport.img
		})
	})

	dispatch(setUsersSports(customSports))
	dispatch(setForecastsSports(customSports))

	dispatch({
		type: SET_SPORTS,
		sports
	})
	
}

export const getSportsFromServer = (): ThunksType => async (dispatch) => {
	let response = await appAPI.getSports()

	dispatch(setSports(response))
}
type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export default appReducer;