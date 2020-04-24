import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'

import { BookmakerType } from '../types/bookmakers'

const SET_BOOKMAKERS = 'bookmakers/SET_BOOKMAKERS'
const TOGGLE_IS_FETCHING = 'bookmakers/TOGGLE_IS_FETCHING'




let initialState = {
    isFetching: false,
    bookmakers: [ {},{},{},{},{},{},{},{},{},{},{},{},{},{},{}] as Array<BookmakerType>
}

type InitialStateType = typeof initialState;
type ActionsTypes = SetBookmakersType;

const bookmakersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_BOOKMAKERS: {
			return {
				...state,
				bookmakers: action.bookmakers
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
type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const setBookmakers = (bookmakers: Array<BookmakerType>): SetBookmakersType => {
	return {
		type: SET_BOOKMAKERS,
		bookmakers
	}
}

export const getMatchesFromServer = ():ThunksType => async (dispatch) => {
    // dispatch(setMatches(matches))
}


export default bookmakersReducer;