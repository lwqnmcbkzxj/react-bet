import { RootReducerType } from '../redux/redux-store'
import { timeFilterEnum, subscriptionFilterEnum, sportTypeFilterEnum } from './filters'
export type AppStateType = ReturnType<RootReducerType>
export const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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

export type SportType = {
	id: number,
	index: number
	name: typeof sportTypeFilterEnum
	visibleText: string
	active: boolean
	image?: string
}
/* LIVE COMMENTS */

