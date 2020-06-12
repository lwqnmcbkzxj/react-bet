import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'

import { CommentType } from '../types/types'
import { commentsAPI } from '../api/api'
import { appAPI } from '../api/api'
import { showAlert } from '../utils/showAlert'

const SET_COMMENTS = 'comments/SET_COMMENTS'
const SET_COMMENTS_IS_GETTING = 'comments/SET_COMMENTS_IS_GETTING'




let initialState = {
	liveComments: [] as Array<CommentType>,
	isGetting: false
}

type InitialStateType = typeof initialState;
type ActionsTypes = SetCommentsType | SetCommentsIsGettingType;

const commentsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_COMMENTS: {
			let comments = [{}] as Array<CommentType>
			debugger
			if (action.comments) 
				comments = [...action.comments]
			return {
				...state,
				liveComments: [...comments]
			}
		}
		case SET_COMMENTS_IS_GETTING: {
			return {
				...state,
				isGetting: action.isGetting
			}	
		}

		default:
			return state;
	}
}

type SetCommentsType = {
	type: typeof SET_COMMENTS,
	comments: Array<CommentType>
}
type SetCommentsIsGettingType = {
	type: typeof SET_COMMENTS_IS_GETTING,
	isGetting: boolean
}






export const getLiveComments = (currentTimeStamp: number): ThunksType => async (dispatch) => {
	let response = await commentsAPI.getLiveComments(currentTimeStamp)
	dispatch(setCommentsIsGetting(true))
	dispatch(setComments(response))
}
export const setComments = (comments: Array<CommentType>): SetCommentsType => {
	return {
		type: SET_COMMENTS,
		comments
	}
}
export const setCommentsIsGetting = (isGetting: boolean): SetCommentsIsGettingType => {
	return {
		type: SET_COMMENTS_IS_GETTING,
		isGetting
	}
}

	
	
	
export const sendComment = (id: number, type: string, text: string, reply_id?: number): ThunksType => async (dispatch) => {
	let response

	if (reply_id === -1) {
		response = await commentsAPI.sendComment(id, type, text)
	} else {
		response = await commentsAPI.sendComment(id, type, text, reply_id)
	}

	if (!response.message)
		showAlert('success', 'Комментарий отправлен')
	else 
		showAlert('error', 'Не удалось отправить комментарий')
}
export const rateComment = (id: number, rateType: number): ThunksType => async (dispatch) => {
	let response
	if (rateType === 1) {
		response = await commentsAPI.likeComment(id)
	} else if (rateType === 2) {
		response = await commentsAPI.dislikeComment(id)
	}
}
	
type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export default commentsReducer;