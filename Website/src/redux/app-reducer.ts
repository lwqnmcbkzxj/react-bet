import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'

const TOGGLE_AUTH_FORM_VISIBILITY = 'app/TOGGLE_AUTH_FORM_VISIBILITY'
const TOGGLE_COMMENTS_BLOCK_VISIBILITY = 'app/TOGGLE_COMMENTS_BLOCK_VISIBILITY'
const CHANGE_MAIN_PAGE_BLOCK_VISIBILITY = 'app/CHANGE_MAIN_PAGE_BLOCK_VISIBILITY'
const SET_MAIN_PAGE_BLOCKS_VISIBILITY = 'app/SET_MAIN_PAGE_BLOCKS_VISIBILITY'

let initialState = {
	isAuthFormVisible: false,
	isCommentsBlockVisible: true,
	mainPageHiddenBlocks: [] as any
}

type InitialStateType = typeof initialState;
type ActionsTypes =
	ToggleAuthFormVisiblilityType |
	ToggleCommentsBlockVisibilityType | 
	SetMainPageBlockVisibilityType | 
	ChangeMainPageBlockVisibilityType;

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case TOGGLE_AUTH_FORM_VISIBILITY: {
			return {
				...state,
				isAuthFormVisible: !state.isAuthFormVisible
			}
		}
		case TOGGLE_COMMENTS_BLOCK_VISIBILITY: {
			return {
				...state,
				isCommentsBlockVisible: !state.isCommentsBlockVisible
			}
		}
		case SET_MAIN_PAGE_BLOCKS_VISIBILITY: {
			let mainPageVisibility = localStorage.getItem('mainPageVisibility') as any
			if (mainPageVisibility) {
				mainPageVisibility = JSON.parse(mainPageVisibility)
			} else {
				for (let blockName of action.blocksNames) {
					mainPageVisibility[blockName] = true
				}

				localStorage.setItem('mainPageVisibility', JSON.stringify(mainPageVisibility))
			}

			return {
				...state,
				mainPageHiddenBlocks: mainPageVisibility
			}
		}
		case CHANGE_MAIN_PAGE_BLOCK_VISIBILITY: {
			let mainPageVisibility = localStorage.getItem('mainPageVisibility') as any
			mainPageVisibility = JSON.parse(mainPageVisibility)

			mainPageVisibility[action.blockName] = !mainPageVisibility[action.blockName]
			localStorage.setItem('mainPageVisibility', JSON.stringify(mainPageVisibility))

			let customHiddenBlockForState = state.mainPageHiddenBlocks;
			customHiddenBlockForState[action.blockName] = !customHiddenBlockForState[action.blockName]
			
		
			return {
				...state,
				mainPageHiddenBlocks: customHiddenBlockForState
			}
		}

		default:
			return state;
	}
}

type ToggleAuthFormVisiblilityType = {
	type: typeof TOGGLE_AUTH_FORM_VISIBILITY
}
type ToggleCommentsBlockVisibilityType = {
	type: typeof TOGGLE_COMMENTS_BLOCK_VISIBILITY
}
type SetMainPageBlockVisibilityType = {
	type: typeof SET_MAIN_PAGE_BLOCKS_VISIBILITY
	blocksNames: string
}
type ChangeMainPageBlockVisibilityType = {
	type: typeof CHANGE_MAIN_PAGE_BLOCK_VISIBILITY
	blockName: string
}
export const toggleAuthFormVisiblility = (): ToggleAuthFormVisiblilityType => {
	return {
		type: TOGGLE_AUTH_FORM_VISIBILITY
	}
}
export const toggleCommentsBlockVisibility = (): ToggleCommentsBlockVisibilityType => {
	return {
		type: TOGGLE_COMMENTS_BLOCK_VISIBILITY
	}
}
export const setMainPageBlocksVisibility = (blocksNames: string): SetMainPageBlockVisibilityType => {
	return {
		type: SET_MAIN_PAGE_BLOCKS_VISIBILITY,
		blocksNames
	}
}
export const changeMainPageHiddenBlock = (blockName: string): ChangeMainPageBlockVisibilityType => {
	return {
		type: CHANGE_MAIN_PAGE_BLOCK_VISIBILITY,
		blockName
	}
}
type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export default appReducer;