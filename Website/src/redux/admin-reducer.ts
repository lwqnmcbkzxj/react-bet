import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'
import { ArticleType } from '../types/admin';
import { postsAPI, appAPI } from '../api/api'
import { showAlert } from '../utils/showAlert';
const SET_ARTICLES = 'admin/SET_ARTICLES'
const SET_ARTICLE = 'admin/SET_ARTICLE'
const SET_PAGES_COUNT = 'admin/SET_PAGES_COUNT'

let initialState = {
	articles: {
		articles: [{}] as Array<ArticleType>,
		currentArticle: {} as ArticleType,
		pagesCount: 1 as number
	},
}

type InitialStateType = typeof initialState;
type ActionsTypes = SetArticlesType | SetArticleType | SetPagesCountType;

const adminReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_ARTICLES: {
			return {
				...state,
				articles: {
					...state.articles,
					articles: action.articles
				}
			}
		}
		case SET_ARTICLE: {
			return {
				...state,
				articles: {
					...state.articles,
					currentArticle: action.article
				}
			}
		}
		case SET_PAGES_COUNT: {

			return {
				...state,				
				[action.pageName]: {
					...state.articles,
					pagesCount: action.pagesCount
				}
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
type SetPagesCountType = {
	type: typeof SET_PAGES_COUNT,
	pagesCount: number
	pageName: string
}

export const setPagesCount = (pageName: string, pagesCount: number): SetPagesCountType => {
	return {
		type: SET_PAGES_COUNT,
		pagesCount,
		pageName
	}
}

export const getAdminArticlesFromServer = (page: number, limit: number, search = "", search_by = ""):ThunksType => async (dispatch) => {
	// dispatch(toggleIsFetching(true))
	let response = await postsAPI.getAdminPosts(page, limit, search, search_by)	
	// dispatch(toggleIsFetching(false))
	
	dispatch(setPagesCount('articles', response.last_page))
	dispatch(setArticles(response.data))
}
export const getArticleFromServer = (id: number): ThunksType => async (dispatch) => {

	// dispatch(toggleIsFetching(true))
	let response = await postsAPI.getAdminPost(id)	
	// dispatch(toggleIsFetching(false))

	dispatch(setArticle(response))
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

export const addArticle = (formData: ArticleType):ThunksType => async (dispatch) => {
	let response = await postsAPI.addPost(formData)
	showAlert('success', 'Статья успешно добавлена')
}
export const editArticle = (id: number, formData: ArticleType):ThunksType => async (dispatch) => {
	let response = await postsAPI.editPost(id, formData)
	showAlert('success', 'Статья успешно изменена')
}
export const deleteArticle = (id: number):ThunksType => async (dispatch) => {
	let response = await postsAPI.deletePost(id)
	showAlert('success', 'Статья успешно удалена')
}

// DOCUMETNS START
export const changePolicy = (text: string):ThunksType => async (dispatch) => {
	let response = await adminAPI.documents.changePolicy(text)
	showAlert('success', 'Успешно изменено')

}
export const changeTerms = (text: string):ThunksType => async (dispatch) => {
	let response = await adminAPI.documents.changeTerms(text)
	showAlert('success', 'Успешно изменено')
}
// DOCUMENTS END







type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export default adminReducer;