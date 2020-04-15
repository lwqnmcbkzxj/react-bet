import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'

import { userAPI } from '../api/api'
const SET_PRODUCTS = 'products/SET_PRODUCTS'

let initialState = {
	logged: false,
	info: {},
	stats: {}

}

type InitialStateType = typeof initialState;
type ActionsTypes = SetProductsType;

const productsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case SET_PRODUCTS: {
			return {
				...state,
			}
		}
		

		default:
			return state;
	}
}



type SetProductsType = {
	type: typeof SET_PRODUCTS
	products: any
}


type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const login = (email: string, password: string): ThunksType => async (dispatch) => {

	let response = await userAPI.login(email, password)
	if (response.token) {
		// dispatch(authUser());
	} else if (response.error === "Invalid credentials") {
		// dispatch(stopSubmit("login", { _error: "Incorrect email or password" }))
	}

}

export default productsReducer;