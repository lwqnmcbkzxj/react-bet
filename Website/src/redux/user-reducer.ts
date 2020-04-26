import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'
import { userAPI, setTokenForAPI } from '../api/api';
import { Dispatch } from 'react';

import axios from 'axios'
const SET_LOGGED = 'user/SET_LOGGED'
const SET_TOKEN = 'user/SET_TOKEN'

let initialState = {
	logged: false,
	token: ""
}

type InitialStateType = typeof initialState;
type ActionsTypes = SetLoggedType | SetTokenType;

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
export const setLogged = (logged: boolean) => {
	return {
		type: SET_LOGGED,
		logged
	}
}

export const register = (username: string, email: string, password: string):ThunksType => async (dispatch) => {
	let response = await userAPI.register(username, email, password)
}


export const login = (email: string, password: string):ThunksType => async (dispatch) => {
	let response = await userAPI.login(email, password)

		// setToken("12345")
}

export const resetPassword = (email: string):ThunksType => async (dispatch) => {
	// let response = await userAPI.resetPassword(email)
}



const setToken = (token: string):ThunksType => async (dispatch) => {
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