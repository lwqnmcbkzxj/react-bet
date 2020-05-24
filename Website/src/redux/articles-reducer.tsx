import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'

import { ArticleType } from '../types/article'
import { postsAPI } from '../api/api'
const SET_ARTICLES = 'articles/SET_ARTICLES'
const SET_ARTICLE = 'articles/SET_ARTICLE'
const TOGGLE_IS_FETCHING = 'articles/TOGGLE_IS_FETCHING'




let initialState = {
	articles: [{}, {}, {}, {}, {}] as Array<ArticleType>,
	currentArticle: {} as ArticleType,
    isFetching: false,
}

type InitialStateType = typeof initialState;
type ActionsTypes =
	SetArticlesType |
	SetArticleType |
	ToggleIsFetchingType;

const articlesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_ARTICLES: {
			return {
				...state,
				articles: action.articles
			}
		}
		case SET_ARTICLE: {
			return {
				...state,
				currentArticle: action.article
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
type SetArticleType = {
	type: typeof SET_ARTICLE,
	article: ArticleType
}

type ToggleIsFetchingType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
}
type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>



export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => {
	return {
		type: TOGGLE_IS_FETCHING,
		isFetching
	}
}

export const getArticlesFromServer = ():ThunksType => async (dispatch) => {
	
	dispatch(toggleIsFetching(true))
	let response = await postsAPI.getPosts()	
	dispatch(toggleIsFetching(false))
	
	dispatch(setArticles(response.data))
}


export const getArticleFromServer = (id: number): ThunksType => async (dispatch) => {

	dispatch(toggleIsFetching(true))
	let response = await postsAPI.getPost(id)	
	dispatch(toggleIsFetching(false))

	dispatch(setArticle(response[0]))
}

export const setArticles = (articles: Array<ArticleType>): SetArticlesType => {
	return {
		type: SET_ARTICLES,
		articles
	}
}

export const setArticle = (article: ArticleType): SetArticleType => {
	return {
		type: SET_ARTICLE,
		article
	}
}




export default articlesReducer;