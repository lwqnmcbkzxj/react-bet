import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'

import { NewsType } from '../types/news'
import { newsAPI } from '../api/api'
import { setPaginationTotalCount, SetPaginationTotalCountType } from './app-reducer'

const SET_NEWS = 'news/SET_NEWS'
const TOGGLE_IS_FETCHING = 'news/TOGGLE_IS_FETCHING'


let initialState = {
    isFetching: false,
	news: [{}, {}, {}, {}, {}] as Array<NewsType>,
}

type InitialStateType = typeof initialState;
type ActionsTypes = SetNewsType | ToggleIsFetchingType | SetPaginationTotalCountType;

const newsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_NEWS: {
			let news = action.news
			if (action.getMore) 
				news = [...state.news, ...news]
			return {
				...state,
				news: [...news]
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
	news: Array<NewsType>,
	getMore?: boolean
}
type ToggleIsFetchingType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
}
type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const setNews = (news: Array<NewsType>, getMore?: boolean): SetNewsType => {
	return {
		type: SET_NEWS,
		news,
		getMore
	}
}

export const getNewsFromServer = (page: number, limit: number):ThunksType => async (dispatch) => {
	
	dispatch(toggleIsFetching(true))
	let response = await newsAPI.getNews(page, limit)	
	dispatch(toggleIsFetching(false))
	dispatch(setPaginationTotalCount(response.total, 'news'))
	dispatch(setNews(response.data, page !== 1))
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => {
	return {
		type: TOGGLE_IS_FETCHING,
		isFetching
	}
}
export default newsReducer;