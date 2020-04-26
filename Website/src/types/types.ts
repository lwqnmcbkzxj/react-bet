import { RootReducerType } from '../redux/redux-store'

export type AppStateType = ReturnType<RootReducerType>

export enum languageEnum {
	rus = 'Русский',
	eng = 'English',
}

/* LIVE COMMENTS */
export type CommentType = {
	userId: number
	userName: string
	userImg: string
	id: number
	text: string
	articleName: string
	articleId: number
	publishDate: number
}
/* LIVE COMMENTS */

