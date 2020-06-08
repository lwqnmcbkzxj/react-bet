import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'

import { BookmakerType } from '../types/bookmakers'
import { bookmakersAPI } from '../api/api'
import { setPaginationTotalCount, SetPaginationTotalCountType } from './app-reducer'

const SET_BOOKMAKERS = 'bookmakers/SET_BOOKMAKERS'
const SET_BOOKMAKER = 'bookmakers/SET_BOOKMAKER'
const TOGGLE_IS_FETCHING = 'bookmakers/TOGGLE_IS_FETCHING'


let initialState = {
	isFetching: false,
	bookmakers: [{}, {}, {}] as Array<BookmakerType>,
	currentBookmaker: {} as BookmakerType,
	totalCount: 1 as number,
	limit: 10 as number,
	page: 1 as number 
}

type InitialStateType = typeof initialState;
type ActionsTypes =
	SetBookmakersType |
	SetBookmakerType |
	ToggleIsFetchingType |
	SetPaginationTotalCountType;

const bookmakersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_BOOKMAKERS: {
			let bookmakers = action.bookmakers
			if (action.getMore) 
				bookmakers = [...state.bookmakers, ...bookmakers]

			return {
				...state,
				bookmakers: [...bookmakers]
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
	getMore?: boolean
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

export const setBookmakers = (bookmakers: Array<BookmakerType>, getMore?: boolean): SetBookmakersType => {
	return {
		type: SET_BOOKMAKERS,
		bookmakers,
		getMore
	}
}
export const setBookmaker = (bookmaker: BookmakerType): SetBookmakerType => {
	return {
		type: SET_BOOKMAKER,
		bookmaker
	}
}
export const getBookmakersFromServer = (page: number, limit: number): ThunksType => async (dispatch) => {

	dispatch(toggleIsFetching(true))
	let response = await bookmakersAPI.getBookmakers(page, limit)	
	dispatch(toggleIsFetching(false))
	dispatch(setPaginationTotalCount(response.length, 'bookmakers'))
	dispatch(setBookmakers(response, page !== 1))
}


export const getBookmakerFromServer = (id: number): ThunksType => async (dispatch) => {

	dispatch(toggleIsFetching(true))
	let bookmaker = await bookmakersAPI.getBookmaker(id)	
	dispatch(toggleIsFetching(false))

	// let bookmaker = getBookmaker(id)
	dispatch(setBookmaker(bookmaker))
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => {
	return {
		type: TOGGLE_IS_FETCHING,
		isFetching
	}
}

export default bookmakersReducer;