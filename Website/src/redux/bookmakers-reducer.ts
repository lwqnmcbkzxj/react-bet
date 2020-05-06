import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'

import { BookmakerType } from '../types/bookmakers'

import bookmakerImg1 from '../assets/img/bookmaker-img-1.png'
import bookmakerImg2 from '../assets/img/bookmaker-img-2.png'
import bookmakerImg3 from '../assets/img/bookmaker-img-3.png'

const SET_BOOKMAKERS = 'bookmakers/SET_BOOKMAKERS'
const SET_BOOKMAKER = 'bookmakers/SET_BOOKMAKER'
const TOGGLE_IS_FETCHING = 'bookmakers/TOGGLE_IS_FETCHING'




let initialState = {
	isFetching: false,
	bookmakers: [
		{
			id: 1,
			name: '1X Ставка',
			position: 1,
			companyLogo: bookmakerImg1,
			isChecked: true,
			rating: 9.40,
			bonus: 1000,
			link: "https://1xstavka.ru/"
		},
		{
			id: 2,
			name: 'Betcity',
			position: 2,
			companyLogo: bookmakerImg2,
			isChecked: true,
			rating: 8.80,
			bonus: 2500,
			link: "https://betcity.ru/"
		},
		{
			id: 3,
			name: 'Ligastavok',
			position: 3,
			companyLogo: bookmakerImg3,
			isChecked: true,
			rating: 8.35,
			bonus: 1000,
			link: "https://www.ligastavok.ru/"
		}
	] as Array<BookmakerType>,
	currentBookmaker: {} as BookmakerType
}

type InitialStateType = typeof initialState;
type ActionsTypes = SetBookmakersType | SetBookmakerType;

const bookmakersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_BOOKMAKERS: {
			return {
				...state,
				bookmakers: action.bookmakers
			}
		}
		case SET_BOOKMAKER: {
			return {
				...state,
				currentBookmaker: action.bookmaker
			}
		}
		default:
			return state;
	}
}

type SetBookmakersType = {
	type: typeof SET_BOOKMAKERS,
	bookmakers: Array<BookmakerType>
}
type SetBookmakerType = {
	type: typeof SET_BOOKMAKER,
	bookmaker: BookmakerType
}
type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const setBookmakers = (bookmakers: Array<BookmakerType>): SetBookmakersType => {
	return {
		type: SET_BOOKMAKERS,
		bookmakers
	}
}
export const setBookmaker = (bookmaker: BookmakerType): SetBookmakerType => {
	return {
		type: SET_BOOKMAKER,
		bookmaker
	}
}
export const getBookmakersFromServer = (): ThunksType => async (dispatch) => {
	// dispatch(setMatches(matches))
}


export const getBookmakerFromServer = (id: number): ThunksType => async (dispatch) => {

	let bookmaker = getBookmaker(id)
	debugger
	dispatch(setBookmaker(bookmaker))
}
const getBookmaker = (id: number) => {
	const bookmaerksList = initialState.bookmakers
	let bookmaker = bookmaerksList.filter(bookmaker => bookmaker.id === id)[0]
	return bookmaker
}


export default bookmakersReducer;