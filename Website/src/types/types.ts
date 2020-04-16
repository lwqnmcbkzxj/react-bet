import { RootReducerType } from '../redux/redux-store'

export type AppStateType = ReturnType<RootReducerType>

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