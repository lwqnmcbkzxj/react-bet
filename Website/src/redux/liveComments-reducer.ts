import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'

import { CommentType } from '../types/types'
import liveCommentImg from '../assets/img/live-comment.png'

const SET_COMMENTS = 'comments/SET_COMMENTS'




let initialState = {
	comments: [
		{
			userId: 1,
			userName: "Имя комментатора",
			userImg: liveCommentImg,
			id: 11,
			text: "Текст комментария, очень длинный текст комментария, вообще длиннющий текст",
			articleName: "Название статьи, очень длинное",
			articleId: 21,
			publishDate: 1587004255
		},
		{
			userId: 2,
			userName: "Иван Антонов",
			userImg: liveCommentImg,
			id: 12,
			text: "Текст комментария, очень длинный текст комментария, вообще длиннющий текст",
			articleName: "Название статьи, очень длинное",
			articleId: 22,
			publishDate: 1587004255
		},
		{
			userId: 3,
			userName: "Дмитрий Иванов",
			userImg: liveCommentImg,
			id: 13,
			text: "Текст комментария, очень длинный текст комментария, вообще длиннющий текст",
			articleName: "Название статьи, очень длинное",
			articleId: 23,
			publishDate: 1587004255
		},
		{
			userId: 4,
			userName: "Васили Иванов",
			userImg: liveCommentImg,
			id: 14,
			text: "Текст комментария, очень длинный текст комментария, вообще длиннющий текст",
			articleName: "Название статьи, очень длинное",
			articleId: 24,
			publishDate: 1587004255
		},
		{
			userId: 5,
			userName: "Николай Иванов",
			userImg: liveCommentImg,
			id: 15,
			text: "Текст комментария, очень длинный текст комментария, вообще длиннющий текст",
			articleName: "Название статьи, очень длинное",
			articleId: 25,
			publishDate: 1587004255
		},
		{
			userId: 6,
			userName: "Виталий Иванов",
			userImg: liveCommentImg,
			id: 16,
			text: "Текст комментария, очень длинный текст комментария, вообще длиннющий текст",
			articleName: "Название статьи, очень длинное",
			articleId: 26,
			publishDate: 1587004255
		},
		{
			userId: 7,
			userName: "Антон Иванов",
			userImg: liveCommentImg,
			id: 17,
			text: "Текст комментария, очень длинный текст комментария, вообще длиннющий текст",
			articleName: "Название статьи, очень длинное",
			articleId: 27,
			publishDate: 1587004255
		},
		{
			userId: 8,
			userName: "Антон Иванов",
			userImg: liveCommentImg,
			id: 18,
			text: "Текст комментария, очень длинный текст комментария, вообще длиннющий текст",
			articleName: "Название статьи, очень длинное",
			articleId: 28,
			publishDate: 1587004255
		}


	] as Array<CommentType>
}

type InitialStateType = typeof initialState;
type ActionsTypes = SetCommentsType;

const liveCommentsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_COMMENTS: {
			return {
				...state,
				comments: action.comments
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

export const toggleAuthFormVisiblility = (comments: Array<CommentType>): SetCommentsType => {
	return {
		type: SET_COMMENTS,
		comments
	}
}


type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export default liveCommentsReducer;