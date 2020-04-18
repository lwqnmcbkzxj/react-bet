import {
	AppStateType,
	ForecastType,
} from '../types/types'
import { ThunkAction } from 'redux-thunk'


const TOGGLE_FILTER = 'forecast/TOGGLE_FILTER'


let initialState = {
	forecast: [
	
	] as ForecastType,
}

type InitialStateType = typeof initialState;
type ActionsTypes = ToggleFilterType;

const forecastsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case TOGGLE_FILTER: {
			
			return {
				...state,
			}
		}

		default:
			return state;
	}
}


type ToggleFilterType = {
	type: typeof TOGGLE_FILTER
}



type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export default forecastsReducer;