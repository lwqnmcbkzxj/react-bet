import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"

import userReducer from "./user-reducer"
import usersReducer from "./users-reducer"
import matchesReducer from "./matches-reducer"
import bookmakersReducer from "./bookmakers-reducer"

import forecastsReducer from "./forecasts-reducer"
import appReducer from "./app-reducer"
import liveCommentsReducer from "./liveComments-reducer"
import { reducer as formReducer } from "redux-form";


let rootReducer = combineReducers({    
	
	app: appReducer,
	liveComments: liveCommentsReducer,

	matches: matchesReducer,

	bookamkers: bookmakersReducer,
	
	user: userReducer,
	users: usersReducer,
	
	forecasts: forecastsReducer,

    form: formReducer
}); 


export type RootReducerType = typeof rootReducer

const store = createStore(rootReducer,composeWithDevTools (applyMiddleware(thunkMiddleware)));
export default store;