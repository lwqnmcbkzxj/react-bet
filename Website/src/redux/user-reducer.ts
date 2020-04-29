import { AppStateType } from '../types/types'
// import { br } from "react-router-dom";

import { ThunkAction } from 'redux-thunk'
import { userAPI, setTokenForAPI } from '../api/api';
import { Dispatch } from 'react';
import { UserType } from '../types/user';
import { stopSubmit, startSubmit } from 'redux-form';
import { setShouldRedirect, SetShouldRedirectType } from './app-reducer';

const SET_LOGGED = 'user/SET_LOGGED'
const SET_REDIRECT_LINK = 'user/SET_REDIRECT_LINK'
const SET_TOKEN = 'user/SET_TOKEN'
const SET_USER_INFO = 'user/SET_USER_INFO'

let initialState = {
	logged: false,
	token: "",
	userInfo: {
		id: 0
	} as UserType 
}

type InitialStateType = typeof initialState;
type ActionsTypes = SetLoggedType | SetTokenType | SetUserInfo | SetShouldRedirectType;

type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

const userReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_LOGGED: {
			return {
				...state,
				logged: action.logged
			}
		}
		case SET_TOKEN: {
			return {
				...state,
				token: action.token
			}
		}
		case SET_USER_INFO: {
			return {
				...state,
				userInfo: action.userInfo
			}
		}
		default:
			return state;
	}
}


type SetLoggedType = {
	type: typeof SET_LOGGED,
	logged: boolean
}
type SetTokenType = {
	type: typeof SET_TOKEN,
	token: string
}
type SetUserInfo = {
	type: typeof SET_USER_INFO,
	userInfo: any
}
export const setLogged = (logged: boolean): SetLoggedType => {
	return {
		type: SET_LOGGED,
		logged
	}
}

export const register = (username: string, email: string, password: string): ThunksType => async (dispatch) => {
	let response = await userAPI.register(username, email, password)

}

export const login = (email: string, password: string): ThunksType => async (dispatch, getState) => {
	let response = await userAPI.login(email, password)
	if (!response.message) {
		dispatch(setLogged(true))
		dispatch(setAccessToken(response.access_token))

		dispatch(getUserInfo())
		dispatch(setShouldRedirect(true))
	}
}

export const resetPassword = (email: string): ThunksType => async (dispatch) => {
	// let response = await userAPI.resetPassword(email)
}

export const logout = (): ThunksType => async (dispatch) => {
	dispatch(setLogged(false))
	dispatch(setAccessToken(""))
}

export const getUserInfo = (): ThunksType => async (dispatch) => {
	let response = await userAPI.getUserInfo()
	if (!response.message) {
		dispatch(setUserInfo(response))
	}
}
export const setUserInfo = (userInfo: any): SetUserInfo => {
	return {
		type: SET_USER_INFO,
		userInfo
	}
}

const setAccessToken = (token: string): ThunksType => async (dispatch) => {
	dispatch(setTokenSuccess(token))
	setTokenForAPI(token)
}

const setTokenSuccess = (token: string): SetTokenType => {
	return {
		type: SET_TOKEN,
		token
	}
}
export default userReducer;