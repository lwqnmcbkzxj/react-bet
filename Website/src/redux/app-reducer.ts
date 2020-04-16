import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'

const TOGGLE_AUTH_FORM_VISIBILITY = 'app/TOGGLE_AUTH_FORM_VISIBILITY'
const TOGGLE_COMMENTS_BLOCK_VISIBILITY = 'app/TOGGLE_COMMENTS_BLOCK_VISIBILITY'

let initialState = {
	isAuthFormVisible: false,
	isCommentsBlockVisible: true

}

type InitialStateType = typeof initialState;
type ActionsTypes =
	ToggleAuthFormVisiblilityType |
	ToggleCommentsBlockVisibilityType;

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

type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export default appReducer;