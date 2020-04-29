import { AppStateType, languageEnum } from '../types/types'
import { ThunkAction } from 'redux-thunk'


const TOGGLE_AUTH_FORM_VISIBILITY = 'app/TOGGLE_AUTH_FORM_VISIBILITY'
const TOGGLE_COMMENTS_BLOCK_VISIBILITY = 'app/TOGGLE_COMMENTS_BLOCK_VISIBILITY'
const CHANGE_MAIN_PAGE_BLOCK_VISIBILITY = 'app/CHANGE_MAIN_PAGE_BLOCK_VISIBILITY'
const SET_MAIN_PAGE_BLOCKS_VISIBILITY = 'app/SET_MAIN_PAGE_BLOCKS_VISIBILITY'
const CHANGE_LANGUAGE = 'app/CHANGE_LANGUAGE'
const SET_REDIRECT_LINK = 'app/SET_REDIRECT_LINK'
const SET_SHOULD_REDIRECT = 'app/SET_SHOULD_REDIRECT'

let initialState = {
	redirectLink: "",
	shouldRedirect: false,
	isAuthFormVisible: false,
	isCommentsBlockVisible: true,
	mainPageBlocksVisibility: {} as any,
	language: languageEnum.rus
}

type InitialStateType = typeof initialState;
type ActionsTypes =
	SetRedirectLinkType | 
	SetShouldRedirectType |
	ToggleAuthFormVisiblilityType |
	ToggleCommentsBlockVisibilityType | 
	SetMainPageBlockVisibilityType | 
	ChangeMainPageBlockVisibilityType |
	ChangeLanguageType;

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
				let mainPageVisibilityNew = { } as any
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
			return {
				...state,
				language: action.language
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
type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export default appReducer;