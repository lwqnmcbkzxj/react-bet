import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'

import { MatchType } from '../types/matches'

const SET_MATCHES = 'matches/SET_MATCHES'
const TOGGLE_IS_FETCHING = 'matches/TOGGLE_IS_FETCHING'




let initialState = {
    isFetching: false,
    matches: [ {},{},{},{},{},{},{},{},{},{},{},{},{},{},{}] as Array<MatchType>
}

type InitialStateType = typeof initialState;
type ActionsTypes = SetMatchesType;

const matchesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_MATCHES: {
			return {
				...state,
				matches: action.matches
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
type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const setMatches = (matches: Array<MatchType>): SetMatchesType => {
	return {
		type: SET_MATCHES,
		matches
	}
}

export const getMatchesFromServer = ():ThunksType => async (dispatch) => {
    // dispatch(setMatches(matches))
}


export default matchesReducer;