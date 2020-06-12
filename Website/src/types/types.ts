import { RootReducerType } from '../redux/redux-store'
import { timeFilterEnum, subscriptionFilterEnum, sportTypeFilterEnum } from './filters'
export type AppStateType = ReturnType<RootReducerType>
export const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export enum languageEnum {
	rus = 'Русский',
	eng = 'English',
}

export type CommentType = {
	id: number
	user_id: number,
	text: string
	reference_to: string,
	referent_id: number,
	updated_at: string,
	created_at: string,
	replies_to: number | null,
	rating: number
	user_name: string,
	user_avatar: string
	replies_to_name: string | null,
	vote: null | string
}

export enum CommentsEnum {
	by_order = "id",
	rating = "rating"
}

export type SportType = {
	id: number,
	index: number
	name: typeof sportTypeFilterEnum
	visibleText: string
	active: boolean
	image?: string
}

export enum RolesEnum {
	user = 1,
	robotForecaster = 2,
	moderator = 3,
	admin = 4,
	techAdmin = 5
export type ShortDataElementType = {
	id: number,
	value: string
}