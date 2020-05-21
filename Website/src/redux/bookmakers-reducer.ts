import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'

import { BookmakerType } from '../types/bookmakers'

import bookmakerImg1 from '../assets/img/bookmaker-img-1.png'
import bookmakerImg2 from '../assets/img/bookmaker-img-2.png'
import bookmakerImg3 from '../assets/img/bookmaker-img-3.png'
import { bookmakersAPI } from '../api/api'

const SET_BOOKMAKERS = 'bookmakers/SET_BOOKMAKERS'
const SET_BOOKMAKER = 'bookmakers/SET_BOOKMAKER'
const TOGGLE_IS_FETCHING = 'bookmakers/TOGGLE_IS_FETCHING'




let initialState = {
	isFetching: false,
	bookmakers: [{}, {}, {}] as Array<BookmakerType>,
	currentBookmaker: {} as BookmakerType
}

type InitialStateType = typeof initialState;
type ActionsTypes = SetBookmakersType | SetBookmakerType | ToggleIsFetchingType;

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
		case TOGGLE_IS_FETCHING: {
			return {
				...state,
				isFetching: action.isFetching
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
type ToggleIsFetchingType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
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

	dispatch(toggleIsFetching(true))
	let response = await bookmakersAPI.getBookmakers()	
	dispatch(toggleIsFetching(false))

	dispatch(setBookmakers(response))
}


export const getBookmakerFromServer = (id: number): ThunksType => async (dispatch) => {

	dispatch(toggleIsFetching(true))
	let bookmaker = await bookmakersAPI.getBookmaker(id)	
	dispatch(toggleIsFetching(false))

	// let bookmaker = getBookmaker(id)
	dispatch(setBookmaker(bookmaker))
}

const getBookmaker = (id: number) => {
	const bookmaerksList = initialState.bookmakers
	let bookmaker = bookmaerksList.filter(bookmaker => bookmaker.id === id)[0]
	return bookmaker
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => {
	return {
		type: TOGGLE_IS_FETCHING,
		isFetching
	}
}

export default bookmakersReducer;