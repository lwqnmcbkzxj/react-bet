import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'
import { ArticleType, DashboardType, UserType, ForecastType } from '../types/admin';
import { postsAPI, appAPI, adminAPI } from '../api/api'
import { showAlert } from '../utils/showAlert';
const SET_USERS = 'admin/SET_USERS'
const SET_USER = 'admin/SET_USER'

const SET_ARTICLES = 'admin/SET_ARTICLES'
const SET_ARTICLE = 'admin/SET_ARTICLE'

const SET_PAGES_COUNT = 'admin/SET_PAGES_COUNT'
const SET_DASHBOARD = 'admin/SET_DASHBOARD'
const TOGGLE_IS_FETCHING = 'admin/TOGGLE_IS_FETCHING'

let initialState = {
	dashboardInfo: {} as DashboardType, 
	articles: {
		articles: [] as Array<ArticleType>,
		currentArticle: {} as ArticleType,
	pagesCount: 1 as number

	},
	users: {
		users: [] as Array<UserType>,
		currentUser: {} as UserType
	},
	forecasts: {
		forecasts: [] as Array<ForecastType>,
		currentForecast: {} as ForecastType
	},
	pagesCount: 1 as number,
	isFetchingArray: [] as Array<string>
}

type InitialStateType = typeof initialState;
type ActionsTypes =
	SetUsersType |
	SetUserType |
	SetArticlesType |
	SetArticleType |
	SetPagesCountType |
	SetDashboardType | 
	ToggleIsFetchingType;

const adminReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_USERS: {
			return {
				...state,
				users: {
					...state.users,
					users: [...action.users]
				}
			}
		}
		case SET_USER: {
			return {
				...state,
				users: {
					...state.users,
					currentUser: action.user
				}
			}
		}
		case SET_ARTICLES: {
			return {
				...state,
				articles: {
					...state.articles,
					articles: [...action.articles]
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
				// [action.pageName]: {
					// ...state.articles,
					pagesCount: action.pagesCount
				// }
			}
		}
		case SET_DASHBOARD: {
			return {
				...state, 
				dashboardInfo: {...action.info}
			}
		}
			
		case TOGGLE_IS_FETCHING: {
			let fetchingArray = initialState.isFetchingArray
			let elemIndex = fetchingArray.indexOf(action.instanceName)

			if (elemIndex === -1) {
				fetchingArray.push(action.instanceName)
			} else {
				fetchingArray.splice(elemIndex, 1)
			}
			
			return {
				...state,
				isFetchingArray: [...fetchingArray]
			}
		}
		default:
			return state;
	}
}

type SetUsersType = {
	type: typeof SET_USERS,
	users: Array<UserType>
}
type SetUserType = {
	type: typeof SET_USER,
	user: UserType
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
}
type SetDashboardType = {
	type: typeof SET_DASHBOARD,
	info: DashboardType
}
type ToggleIsFetchingType = {
	type: typeof TOGGLE_IS_FETCHING,
	instanceName: string
}
export const setPagesCount = (pagesCount: number): SetPagesCountType => {
	return {
		type: SET_PAGES_COUNT,
		pagesCount,
	}
}
export const toggleIsFetching = (instanceName: string):ToggleIsFetchingType => {
	return {
		type: TOGGLE_IS_FETCHING,
		instanceName
	}
}


// DASHBOARD START
export const getDashboardInfo = (): ThunksType => async (dispatch) => {
	dispatch(toggleIsFetching('dashboard'))
	let response = await adminAPI.getAdminDashboard()	

	dispatch(toggleIsFetching('dashboard'))
	dispatch(setDashboardInfo(response))
}
const setDashboardInfo = (info: DashboardType): SetDashboardType  => {
	return {
		type: SET_DASHBOARD,
		info
	}
}
// DASHBOARD END

// USERS START
export const getAdminUsersFromServer = (page: number, limit: number, search = "", search_by = ""):ThunksType => async (dispatch) => {
	dispatch(toggleIsFetching('users'))
	let response = await adminAPI.users.getAdminUsers(page, limit, search, search_by)	
	dispatch(toggleIsFetching('users'))
	
	dispatch(setPagesCount(response.last_page))
	dispatch(setUsers(response.data))
}
export const getAdminUserFromServer = (id: number):ThunksType => async (dispatch) => {
	dispatch(toggleIsFetching('user'))
	let response = await adminAPI.users.getAdminUser(id)	
	dispatch(toggleIsFetching('user'))

	dispatch(setUser(response.user))
}
const setUsers = (users: Array<UserType>): SetUsersType => {
	return {
		type: SET_USERS,
		users
	}
}

const setUser = (user: UserType): SetUserType => {
	debugger
	return {
		type: SET_USER,
		user
	}
}
export const addUser = (formData: UserType):ThunksType => async (dispatch) => {
	let response = await adminAPI.users.addUser(formData)
	showAlert('success', 'Пользователь успешно добавлен')
}
export const editUser = (id: number, formData: UserType):ThunksType => async (dispatch) => {
	let response = await adminAPI.users.editUser(id, formData)
	showAlert('success', 'Пользователь успешно изменен')
}
export const deleteUser = (id: number):ThunksType => async (dispatch) => {
	let response = await adminAPI.users.deleteUser(id)
	showAlert('success', 'Пользователь успешно удален')
}
// USERS END




// ARTICLES START
export const getAdminArticlesFromServer = (page: number, limit: number, search = "", search_by = ""):ThunksType => async (dispatch) => {
	dispatch(toggleIsFetching('articles'))
	let response = await adminAPI.posts.getAdminPosts(page, limit, search, search_by)	
	dispatch(toggleIsFetching('articles'))
	
	dispatch(setPagesCount(response.last_page))
	dispatch(setArticles(response.data))
}
export const getArticleFromServer = (id: number): ThunksType => async (dispatch) => {

	dispatch(toggleIsFetching('article'))
	let response = await adminAPI.posts.getAdminPost(id)	
	dispatch(toggleIsFetching('article'))

	dispatch(setArticle(response))
}
const setArticles = (articles: Array<ArticleType>): SetArticlesType => {
	return {
		type: SET_ARTICLES,
		articles
	}
}
const setArticle = (article: ArticleType): SetArticleType => {
	return {
		type: SET_ARTICLE,
		article
	}
}
export const addArticle = (formData: ArticleType):ThunksType => async (dispatch) => {
	let response = await adminAPI.posts.addPost(formData)
	showAlert('success', 'Статья успешно добавлена')
}
export const editArticle = (id: number, formData: ArticleType):ThunksType => async (dispatch) => {
	let response = await adminAPI.posts.editPost(id, formData)
	showAlert('success', 'Статья успешно изменена')
}
export const deleteArticle = (id: number):ThunksType => async (dispatch) => {
	let response = await adminAPI.posts.deletePost(id)
	showAlert('success', 'Статья успешно удалена')
}
// ARTICLES END

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