import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'

import { NewsType } from '../types/news'
import { newsAPI } from '../api/api'

const SET_NEWS = 'news/SET_NEWS'
const TOGGLE_IS_FETCHING = 'news/TOGGLE_IS_FETCHING'


let initialState = {
    isFetching: false,
	news: [{}, {}, {}, {}, {}] as Array<NewsType>,
}

type InitialStateType = typeof initialState;
type ActionsTypes = SetNewsType | ToggleIsFetchingType;

const newsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_NEWS: {
			return {
				...state,
				news: action.news
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

type SetNewsType = {
	type: typeof SET_NEWS,
	news: Array<NewsType>
}
type ToggleIsFetchingType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
}
type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const setNews = (news: Array<NewsType>): SetNewsType => {
	return {
		type: SET_NEWS,
		news
	}
}

export const getNewsFromServer = ():ThunksType => async (dispatch) => {
	
	dispatch(toggleIsFetching(true))
	let response = await newsAPI.getNews()	
	dispatch(toggleIsFetching(false))

	dispatch(setNews(response.data))
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => {
	return {
		type: TOGGLE_IS_FETCHING,
		isFetching
	}
}
export default newsReducer;