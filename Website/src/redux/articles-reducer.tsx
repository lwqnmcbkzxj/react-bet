import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'

import { ArticleType } from '../types/article'

const SET_ARTICLES = 'articles/SET_ARTICLE'
const TOGGLE_IS_FETCHING = 'articles/TOGGLE_IS_FETCHING'




let initialState = {
    isFetching: false,
	articles: [{}, {}, {}, {}, {}] as Array<ArticleType>,
	currentArticle: {} as ArticleType
}

type InitialStateType = typeof initialState;
type ActionsTypes = SetArticlesType;

const articlesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_ARTICLES: {
			return {
				...state,
				articles: action.articles
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
type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const setNews = (articles: Array<ArticleType>): SetArticlesType => {
	return {
		type: SET_ARTICLES,
		articles
	}
}

export const getArticlesFromServer = ():ThunksType => async (dispatch) => {
    // dispatch(setMatches(matches))
}


export default articlesReducer;