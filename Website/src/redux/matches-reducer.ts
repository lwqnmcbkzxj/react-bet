import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'
import { matchesAPI } from '../api/api'
import { setPaginationTotalCount, SetPaginationTotalCountType } from './app-reducer'
import { MatchType } from '../types/matches'

const SET_MATCHES = 'matches/SET_MATCHES'
const SET_MATCH = 'matches/SET_MATCH'
const TOGGLE_IS_FETCHING = 'matches/TOGGLE_IS_FETCHING'




let initialState = {
	matches: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}] as Array<MatchType>,
	currentMatch: {} as MatchType,
    isFetching: false,
}

type InitialStateType = typeof initialState;
type ActionsTypes =
	SetMatchesType |
	SetMatchType |
	ToggleIsFetchingType | 
	SetPaginationTotalCountType;

const matchesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_MATCHES: {
			let matches = action.matches
			if (action.getMore) 
				matches = [...state.matches, ...matches]
			return {
				...state,
				matches: [...matches]
			}
		}
		case SET_MATCH: {
			return {
				...state,
				currentMatch: {...action.match}
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
	matches: Array<MatchType>,
	getMore?: boolean
}
type SetMatchType = {
	type: typeof SET_MATCH,
	match: MatchType
}


type ToggleIsFetchingType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
}
type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const setMatches = (matches: Array<MatchType>, getMore?: boolean): SetMatchesType => {
	return {
		type: SET_MATCHES,
		matches,
		getMore
	}
}
export const setMatch = (match: MatchType): SetMatchType => {
	return {
		type: SET_MATCH,
		match
	}
}
export const getMatchesFromServer = (page: number, limit: number): ThunksType => async (dispatch) => {
    dispatch(toggleIsFetching(true))
	let response = await matchesAPI.getMatches(page, limit)	
	dispatch(toggleIsFetching(false))
	dispatch(setPaginationTotalCount(response.meta.total, 'matches'))
	dispatch(setMatches(response.data, page !== 1))

}

export const getMatchFromServer = (id: number): ThunksType => async (dispatch) => {
    dispatch(toggleIsFetching(true))
	let response = await matchesAPI.getMatch(id)	
	dispatch(toggleIsFetching(false))

	dispatch(setMatch(response))
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => {
	return {
		type: TOGGLE_IS_FETCHING,
		isFetching
	}
}


export default matchesReducer;