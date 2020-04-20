import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'

const A = 'user/A'

let initialState = {
	logged: false,

}

type InitialStateType = typeof initialState;
type ActionsTypes = AT;

const userReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		

		default:
			return state;
	}
}



type AT = {
	type: typeof A
}


type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export default userReducer;