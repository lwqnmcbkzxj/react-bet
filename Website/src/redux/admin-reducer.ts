import { AppStateType, OptionsType, BannerType } from '../types/types'
import { ThunkAction } from 'redux-thunk'
import { ArticleType, DashboardType, UserType, ForecastType, BookmakerType, EventType, ChampionshipType } from '../types/admin';
import { adminAPI } from '../api/api'
import { showAlert } from '../utils/showAlert';
import FileSaver, { saveAs } from 'file-saver'

const SET_USERS = 'admin/SET_USERS'
const SET_USER = 'admin/SET_USER'

const SET_ARTICLES = 'admin/SET_ARTICLES'
const SET_ARTICLE = 'admin/SET_ARTICLE'

const SET_BOOKMAKERS = 'admin/SET_BOOKMAKERS'
const SET_BOOKMAKER = 'admin/SET_BOOKMAKER'

const SET_FORECASTS = 'admin/SET_FORECASTS'
const SET_FORECAST = 'admin/SET_FORECAST'

const SET_EVENTS = 'admin/SET_EVENTS'
const SET_EVENT = 'admin/SET_EVENT'

const SET_CHAMPIONSHIPS = 'admin/SET_CHAMPIONSHIPS'
const SET_CHAMPIONSHIP = 'admin/SET_CHAMPIONSHIP'

const SET_BANNERS = 'admin/SET_BANNERS'
const SET_BANNER = 'admin/SET_BANNER'



const SET_PAGES_COUNT = 'admin/SET_PAGES_COUNT'
const TOGGLE_IS_FETCHING = 'admin/TOGGLE_IS_FETCHING'

const SET_DASHBOARD = 'admin/SET_DASHBOARD'

let initialState = {
	dashboardInfo: {} as DashboardType, 
	articles: {
		articles: [] as Array<ArticleType>,
		currentArticle: {} as ArticleType,
	},
	users: {
		users: [] as Array<UserType>,
		currentUser: {} as UserType
	},
	forecasts: {
		forecasts: [] as Array<ForecastType>,
		currentForecast: {} as ForecastType
	},
	bookmakers: {
		bookmakers: [] as Array<BookmakerType>,
		currentBookmaker: {} as BookmakerType
	},
	events: {
		events: [] as Array<EventType>,
		currentEvent: {} as EventType
	},
	championships: {
		championships: [] as Array<ChampionshipType>,
		currentChampionship: {} as ChampionshipType
	},
	banners: {
		banners: [] as Array<BannerType>,
		currentBanner: {} as BannerType
	},
	pagesCount: 1 as number,
	isFetchingArray: [] as Array<string>
}

type InitialStateType = typeof initialState;
type ActionsTypes =
	SetUsersType | SetUserType |
	SetArticlesType | SetArticleType |
	SetBookmakersType | SetBookmakerType |
	SetForecastsType | SetForecastType |
	SetEventsType | SetEventType |
	SetChampionshipsType | SetChampionshipType |
	SetBannersType | SetBannerType |
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
			
		case SET_FORECASTS: {
			return {
				...state,
				forecasts: {
					...state.forecasts,
					forecasts: [...action.forecasts]
				}
			}
		}
		case SET_FORECAST: {
			return {
				...state,
				forecasts: {
					...state.forecasts,
					currentForecast: action.forecast
				}
			}
		}
			
		case SET_BOOKMAKERS: {
			return {
				...state,
				bookmakers: {
					...state.bookmakers,
					bookmakers: [...action.bookmakers]
				}
			}
		}
		case SET_BOOKMAKER: {
			return {
				...state,
				bookmakers: {
					...state.bookmakers,
					currentBookmaker: action.bookmaker
				}
			}
		}
			
		case SET_EVENTS: {
			return {
				...state,
				events: {
					...state.events,
					events: [...action.events]
				}
			}
		}
		case SET_EVENT: {
			return {
				...state,
				events: {
					...state.events,
					currentEvent: action.event
				}
			}
		}
			
		case SET_CHAMPIONSHIPS: {
			return {
				...state,
				championships: {
					...state.championships,
					championships: [...action.championships]
				}
			}
		}
		case SET_CHAMPIONSHIP: {
			return {
				...state,
				championships: {
					...state.championships,
					currentChampionship: action.championship
				}
			}
		}
			
		case SET_BANNERS: {
			return {
				...state,
				banners: {
					...state.banners,
					banners: [...action.banners]
				}
			}
		}
		case SET_BANNER: {
			return {
				...state,
				banners: {
					...state.banners,
					currentBanner: action.banner
				}
			}
		}
			
		case SET_PAGES_COUNT: {

			return {
				...state,				
				pagesCount: action.pagesCount
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

type SetForecastsType = {
	type: typeof SET_FORECASTS,
	forecasts: Array<ForecastType>
}
type SetForecastType = {
	type: typeof SET_FORECAST,
	forecast: ForecastType
}

type SetArticlesType = {
	type: typeof SET_ARTICLES,
	articles: Array<ArticleType>
}
type SetArticleType = {
	type: typeof SET_ARTICLE,
	article: ArticleType
}

type SetBookmakersType = {
	type: typeof SET_BOOKMAKERS,
	bookmakers: Array<BookmakerType>
}
type SetBookmakerType = {
	type: typeof SET_BOOKMAKER,
	bookmaker: BookmakerType
}

type SetEventsType = {
	type: typeof SET_EVENTS,
	events: Array<EventType>
}
type SetEventType = {
	type: typeof SET_EVENT,
	event: EventType
}

type SetChampionshipsType = {
	type: typeof SET_CHAMPIONSHIPS,
	championships: Array<ChampionshipType>
}
type SetChampionshipType = {
	type: typeof SET_CHAMPIONSHIP,
	championship: ChampionshipType
}


type SetBannersType = {
	type: typeof SET_BANNERS,
	banners: Array<BannerType>
}
type SetBannerType = {
	type: typeof SET_BANNER,
	banner: BannerType
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


// FORECASTS START
export const getAdminForecastsFromServer = (page: number, limit: number, search = "", search_by = "", userId = 0):ThunksType => async (dispatch) => {
	dispatch(toggleIsFetching('forecasts'))
	let response 
	if (userId)
		response = await adminAPI.forecsats.getUserForecasts(page, limit, search, search_by, userId)	
	else 
		response = await adminAPI.forecsats.getAdminForecasts(page, limit, search, search_by)
		
	dispatch(toggleIsFetching('forecasts'))
	
	dispatch(setPagesCount(response.meta.last_page))
	dispatch(setForecasts(response.data))
}

export const getAdminForecastFromSErver = (id: number): ThunksType => async (dispatch) => {

	dispatch(toggleIsFetching('forecast'))
	let response = await adminAPI.forecsats.getAdminForecast(id)	
	dispatch(toggleIsFetching('forecast'))

	dispatch(setForecast(response))
}
const setForecasts = (forecasts: Array<ForecastType>): SetForecastsType => {
	return {
		type: SET_FORECASTS,
		forecasts
	}
}
const setForecast = (forecast: ForecastType): SetForecastType => {
	return {
		type: SET_FORECAST,
		forecast
	}
}
export const addForecast = (formData: ForecastType):ThunksType => async (dispatch) => {
	let response = await adminAPI.forecsats.addForecast(formData)
	showAlert('success', 'Прогноз успешно добавлен')
}
export const editForecast = (id: number, formData: ForecastType):ThunksType => async (dispatch) => {
	let response = await adminAPI.forecsats.editForecast(id, formData)
	showAlert('success', 'Прогноз успешно изменен')
}
export const deleteForecast = (id: number):ThunksType => async (dispatch) => {
	let response = await adminAPI.forecsats.deleteForecast(id)
	showAlert('success', 'Прогноз успешно удален')
}
// FORECASTS END

// ARTICLES START
export const getAdminArticlesFromServer = (page: number, limit: number, search = "", search_by = ""):ThunksType => async (dispatch) => {
	dispatch(toggleIsFetching('articles'))
	let response = await adminAPI.posts.getAdminPosts(page, limit, search, search_by)	
	dispatch(toggleIsFetching('articles'))
	

	// TO DO HERE 
	dispatch(setPagesCount(response.meta.last_page))
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
export const addArticle = (formData: ArticleType): ThunksType => async (dispatch) => {
	dispatch(toggleIsFetching('article-action'))
	let response = await adminAPI.posts.addPost(formData)
	dispatch(toggleIsFetching('article-action'))
	showAlert('success', 'Статья успешно добавлена')
}
export const editArticle = (id: number, formData: ArticleType): ThunksType => async (dispatch) => {
	dispatch(toggleIsFetching('article-action'))
	let response = await adminAPI.posts.editPost(id, formData)
	
	dispatch(toggleIsFetching('article-action'))
	showAlert('success', 'Статья успешно изменена')
}
export const deleteArticle = (id: number):ThunksType => async (dispatch) => {
	let response = await adminAPI.posts.deletePost(id)
	showAlert('success', 'Статья успешно удалена')
}
// ARTICLES END

// BOOKMAKERS START
export const getBookmakersFromServer = (page: number, limit: number, search = "", search_by = ""):ThunksType => async (dispatch) => {
	dispatch(toggleIsFetching('bookmakers'))
	let response = await adminAPI.boomakers.getAdminBookmakers(page, limit, search, search_by)	
	dispatch(toggleIsFetching('bookmakers'))
	
	dispatch(setPagesCount(response.last_page))
	dispatch(setBookmakers(response.data))
}
export const getBookmakerFromServer = (id: number): ThunksType => async (dispatch) => {

	dispatch(toggleIsFetching('bookmaker'))
	let response = await adminAPI.boomakers.getAdminBookmaker(id)	
	dispatch(toggleIsFetching('bookmaker'))

	dispatch(setBookmaker(response))
}
const setBookmakers = (bookmakers: Array<BookmakerType>): SetBookmakersType => {
	return {
		type: SET_BOOKMAKERS,
		bookmakers
	}
}
const setBookmaker = (bookmaker: BookmakerType): SetBookmakerType => {
	return {
		type: SET_BOOKMAKER,
		bookmaker
	}
}
export const addBookmaker = (formData: BookmakerType):ThunksType => async (dispatch) => {
	let response = await adminAPI.boomakers.addBookmaker(formData)
	showAlert('success', 'Букмекер успешно добавлен')
}
export const editBookmaker = (id: number, formData: BookmakerType):ThunksType => async (dispatch) => {
	let response = await adminAPI.boomakers.editBookmaker(id, formData)
	showAlert('success', 'Букмекер успешно изменен')
}
export const deleteBookmaker = (id: number):ThunksType => async (dispatch) => {
	let response = await adminAPI.boomakers.deleteBookmaker(id)
	showAlert('success', 'Букмекер успешно удален')
}
// BOOKMAKERS END


// EVENTS START
export const getAdminEventsFromServer = (page: number, limit: number, search = "", search_by = ""):ThunksType => async (dispatch) => {
	dispatch(toggleIsFetching('events'))
	let response = await adminAPI.events.getAdminEvents(page, limit, search, search_by)	
	dispatch(toggleIsFetching('events'))
	
	dispatch(setPagesCount(response.last_page))
	dispatch(setEvents(response.data))
}
export const getAdminEventFromServer = (id: number): ThunksType => async (dispatch) => {

	dispatch(toggleIsFetching('event'))
	let response = await adminAPI.events.getAdminEvent(id)	
	dispatch(toggleIsFetching('event'))

	dispatch(setEvent(response))
}
const setEvents = (events: Array<EventType>): SetEventsType => {
	return {
		type: SET_EVENTS,
		events
	}
}
const setEvent = (event: EventType): SetEventType => {
	return {
		type: SET_EVENT,
		event
	}
}
export const addEvent = (formData: EventType):ThunksType => async (dispatch) => {
	let response = await adminAPI.events.addEvent(formData)
	showAlert('success', 'Событие успешно добавлено')
}
export const editEvent = (id: number, formData: EventType):ThunksType => async (dispatch) => {
	let response = await adminAPI.events.editEvent(id, formData)
	showAlert('success', 'Событие успешно изменено')
}
export const deleteEvent = (id: number):ThunksType => async (dispatch) => {
	let response = await adminAPI.events.deleteEvent(id)
	showAlert('success', 'Событие успешно удалено')
}
// EVENTS END


// EVENTS START
export const getAdminChampionshipsFromServer = (page: number, limit: number, search = "", search_by = ""):ThunksType => async (dispatch) => {
	dispatch(toggleIsFetching('championships'))
	let response = await adminAPI.championships.getAdminChampionships(page, limit, search, search_by)	
	dispatch(toggleIsFetching('championships'))
	
	dispatch(setPagesCount(response.last_page))
	dispatch(setChampionships(response.data))
}
export const getAdminChampionshipFromServer = (id: number): ThunksType => async (dispatch) => {

	dispatch(toggleIsFetching('championship'))
	let response = await adminAPI.championships.getAdminChampionship(id)	
	dispatch(toggleIsFetching('championship'))

	dispatch(setChampionship(response))
}
const setChampionships = (championships: Array<ChampionshipType>): SetChampionshipsType => {
	return {
		type: SET_CHAMPIONSHIPS,
		championships
	}
}
const setChampionship = (championship: ChampionshipType): SetChampionshipType => {
	return {
		type: SET_CHAMPIONSHIP,
		championship
	}
}
export const addChampionship = (formData: ChampionshipType):ThunksType => async (dispatch) => {
	let response = await adminAPI.championships.addChampionship(formData)
	showAlert('success', 'Чемпионат успешно добавлен')
}
export const editChampionship = (id: number, formData: ChampionshipType):ThunksType => async (dispatch) => {
	let response = await adminAPI.championships.editChampionship(id, formData)
	showAlert('success', 'Чемпионат успешно изменен')
}
export const deleteChampionship = (id: number):ThunksType => async (dispatch) => {
	let response = await adminAPI.championships.deleteChampionship(id)
	showAlert('success', 'Чемпионат успешно удален')
}
// EVENTS END





// APP START
export const changePolicy = (text: string):ThunksType => async (dispatch) => {
	let response = await adminAPI.app.changePolicy(text)
	showAlert('success', 'Успешно изменено')

}
export const changeTerms = (text: string):ThunksType => async (dispatch) => {
	let response = await adminAPI.app.changeTerms(text)
	showAlert('success', 'Успешно изменено')
}
export const editOptions = (options: OptionsType):ThunksType => async (dispatch) => {
	let response = await adminAPI.app.editOptions(options)
	showAlert('success', 'Опции успешно изменены')
}
// APP END

export const exportAdminData = (instanceName: string):ThunksType => async (dispatch) => {
	// let response = await appAPI.exportData(`admin/export/${instanceName}`) as string

    // let blob = new Blob(["Hello, world!"], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"});
	// saveAs(blob, `${instanceName}.xlsx`);
	
}





type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export default adminReducer;