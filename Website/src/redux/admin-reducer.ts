import { AppStateType } from '../types/types'
import { ThunkAction } from 'redux-thunk'

const SET_COMMENTS = 'admin/SET_COMMENTS'

let initialState = {
	
}

type InitialStateType = typeof initialState;
type ActionsTypes = SetCommentsType;

const liveCommentsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		
		default:
			return state;
	}
}

type SetCommentsType = {
	type: typeof SET_COMMENTS,
}




type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export default liveCommentsReducer;