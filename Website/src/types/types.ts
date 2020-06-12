import { RootReducerType } from '../redux/redux-store'
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
	referent_title: string
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
	name: any
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
}

export type OptionsType = {
	telegram: string
	vkontakte: string
	twitter: string
	instagram: string
	facebook: string
	ios_link: string
	android_link: string
	copyright: string
	main_page_notification: string
	show_forecast_comments: boolean
	feedback_email: string
	head_scripts: string
	footer_scripts: string
}
export type BannerType = {
	id: number
	title: string
	link: string
	image: string
	delay: number
	timeout: number
	position: number
	is_video: number | boolean
	status: number | boolean
	created_at: string
	updated_at: string
}

export type ShortDataElementType = {
	id: number,
	value: string
}

export type SortedLabelType = {
	name: string
	value: string
}