import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'

import { ArticleType } from '../types/article'

const SET_ARTICLES = 'articles/SET_ARTICLE'
const TOGGLE_IS_FETCHING = 'articles/TOGGLE_IS_FETCHING'




let initialState = {
	articles: [{}, {}, {}, {}, {}] as Array<ArticleType>,
	currentArticle: {} as ArticleType,
    isFetching: false,
}

type InitialStateType = typeof initialState;
type ActionsTypes = SetArticlesType | ToggleIsFetchingType;

const articlesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_ARTICLES: {
			return {
				...state,
				articles: action.articles
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

type SetArticlesType = {
	type: typeof SET_ARTICLES,
	articles: Array<ArticleType>
}
type ToggleIsFetchingType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
}
type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const setArticles = (articles: Array<ArticleType>): SetArticlesType => {
	return {
		type: SET_ARTICLES,
		articles
	}
}


export const getArticlesFromServer = ():ThunksType => async (dispatch) => {
	
	dispatch(toggleIsFetching(true))
	// let response = await articlesAPI.getArticles()	
	setTimeout(() => { dispatch(toggleIsFetching(false)) }, 2000)

	// dispatch(setArticles(response))
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => {
	return {
		type: TOGGLE_IS_FETCHING,
		isFetching
	}
}


export default articlesReducer;