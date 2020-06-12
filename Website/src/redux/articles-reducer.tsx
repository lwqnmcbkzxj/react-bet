import { AppStateType, CommentType } from '../types/types'
import { ThunkAction } from 'redux-thunk'

import { ArticleType } from '../types/article'
import { postsAPI, commentsAPI } from '../api/api'
import { showAlert } from '../utils/showAlert'
import { setPaginationTotalCount, SetPaginationTotalCountType } from './app-reducer'

const SET_ARTICLES = 'articles/SET_ARTICLES'
const SET_ARTICLE = 'articles/SET_ARTICLE'
const TOGGLE_IS_FETCHING = 'articles/TOGGLE_IS_FETCHING'
const SET_ARTICLE_COMMENTS = 'articles/SET_ARTICLE_COMMENTS'

let initialState = {
	articles: [{}, {}, {}, {}, {}] as Array<ArticleType>,
	currentArticle: {} as ArticleType,
	isFetching: false,
}

type InitialStateType = typeof initialState;
type ActionsTypes =
	SetArticlesType |
	SetArticleType |
	SetArticleComments |
	ToggleIsFetchingType | 
	SetPaginationTotalCountType;

const articlesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_ARTICLES: {
			let articles = action.articles
			if (action.getMore) 
				articles = [...state.articles, ...articles]
			return {
				...state,
				articles: articles
			}
		}
		case SET_ARTICLE: {
			return {
				...state,
				currentArticle: action.article
			}
		}
		case SET_ARTICLE_COMMENTS: {
			return {
				...state,
				currentArticle: {
					...state.currentArticle,
					comments: [...action.comments]
				}
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
	getMore?: boolean
}
type SetArticleType = {
	type: typeof SET_ARTICLE,
	article: ArticleType
}

type ToggleIsFetchingType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
}
type SetArticleComments = {
	type: typeof SET_ARTICLE_COMMENTS,
	id: number
	comments: Array<CommentType>
}
type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>



export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => {
	return {
		type: TOGGLE_IS_FETCHING,
		isFetching
	}
}

export const getArticlesFromServer = (page: number, limit: number):ThunksType => async (dispatch) => {
	
	dispatch(toggleIsFetching(true))
	let response = await postsAPI.getPosts(page, limit)	
	dispatch(toggleIsFetching(false))

	dispatch(setPaginationTotalCount(response.meta.total, 'articles'))
	dispatch(setArticles(response.data, page !== 1))
}


export const getArticleFromServer = (id: number): ThunksType => async (dispatch) => {

	dispatch(toggleIsFetching(true))
	let response = await postsAPI.getPost(id)	
	dispatch(toggleIsFetching(false))

	dispatch(setArticle(response))
}

export const setArticles = (articles: Array<ArticleType>, getMore?: boolean): SetArticlesType => {
	return {
		type: SET_ARTICLES,
		articles,
		getMore
	}
}

export const setArticle = (article: ArticleType): SetArticleType => {
	return {
		type: SET_ARTICLE,
		article
	}
}

export const ratePost = (id: number, type: number): ThunksType => async (dispatch) => {
	let response
	if (type === 1) {
		response = await postsAPI.likePost(id)	
	} else if (type === 2){
		response = await postsAPI.dislikePost(id)	
	}
}

export const getArticleComments = (id: number, filterName: string): ThunksType => async (dispatch) => {
	let response = await commentsAPI.getComments(id, 'posts', filterName)

	dispatch({
		type: SET_ARTICLE_COMMENTS,
		id,
		comments: response
	})
}


export default articlesReducer;