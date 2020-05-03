import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'

import { MatchType } from '../types/matches'

const SET_MATCHES = 'matches/SET_MATCHES'
const TOGGLE_IS_FETCHING = 'matches/TOGGLE_IS_FETCHING'




let initialState = {
	matches: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}] as Array<MatchType>,
	currentMatch: {} as MatchType,
    isFetching: false,
}

type InitialStateType = typeof initialState;
type ActionsTypes = SetMatchesType | ToggleIsFetchingType;

const matchesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_MATCHES: {
			return {
				...state,
				matches: action.matches
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

type SetMatchesType = {
	type: typeof SET_MATCHES,
	matches: Array<MatchType>
}
type ToggleIsFetchingType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
}
type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const setMatches = (matches: Array<MatchType>): SetMatchesType => {
	return {
		type: SET_MATCHES,
		matches
	}
}

export const getMatchesFromServer = (): ThunksType => async (dispatch) => {
    dispatch(toggleIsFetching(true))
	// let response = await matchesAPI.getNews()	
	setTimeout(() => { dispatch(toggleIsFetching(false)) }, 2000)

	// dispatch(setMatches(response))
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => {
	return {
		type: TOGGLE_IS_FETCHING,
		isFetching
	}
}


export default matchesReducer;