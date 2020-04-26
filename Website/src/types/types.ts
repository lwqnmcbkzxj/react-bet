import { RootReducerType } from '../redux/redux-store'

import footballImg from '../assets/img/football.png'
import tennisImg from '../assets/img/table-tennis.png'
import basketballImg from '../assets/img/basketball.png'
import hockeyImg from '../assets/img/hockey.png'


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

export const SportsImagesObj = {
	football: footballImg,
	tennis: tennisImg,
	basketball: basketballImg,
	hockey: hockeyImg,
}