import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'

import { NewsType } from '../types/news'

const SET_NEWS = 'news/SET_NEWS'
const TOGGLE_IS_FETCHING = 'news/TOGGLE_IS_FETCHING'




let initialState = {
    isFetching: false,
	news: [{}, {}, {}, {}, {}] as Array<NewsType>,
	currentSingleNews: {} as NewsType
}

type InitialStateType = typeof initialState;
type ActionsTypes = SetNewsType;

const newsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_NEWS: {
			return {
				...state,
				news: action.news
			}
		}

		default:
			return state;
	}
}

type SetNewsType = {
	type: typeof SET_NEWS,
	news: Array<NewsType>
}
type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const setNews = (news: Array<NewsType>): SetNewsType => {
	return {
		type: SET_NEWS,
		news
	}
}

export const getNewsFromServer = ():ThunksType => async (dispatch) => {
    // dispatch(setMatches(matches))
}


export default newsReducer;