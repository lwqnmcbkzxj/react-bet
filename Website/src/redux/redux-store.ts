import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"

import adminReducer from './admin-reducer'

import meReducer from "./me-reducer"
import userReducer from "./user-reducer"
import usersReducer from "./users-reducer"
import matchesReducer from "./matches-reducer"
import bookmakersReducer from "./bookmakers-reducer"
import newsReducer from "./news-reducer"
import forecastsReducer from "./forecasts-reducer"
import appReducer from "./app-reducer"
import liveCommentsReducer from "./liveComments-reducer"

import { reducer as formReducer } from "redux-form";
import articlesReducer from './articles-reducer'


let rootReducer = combineReducers({    
	
	admin: adminReducer,

	app: appReducer,
	liveComments: liveCommentsReducer,

	matches: matchesReducer,
	articles: articlesReducer,
	bookmakers: bookmakersReducer,
	
	me: meReducer,
	user: userReducer,
	users: usersReducer,
	
	news: newsReducer,

	forecasts: forecastsReducer,

    form: formReducer
}); 


export type RootReducerType = typeof rootReducer

const devTools =
  process.env.NODE_ENV === "production"
    ? applyMiddleware(thunkMiddleware)
    : composeWithDevTools(applyMiddleware(thunkMiddleware));



const store = createStore(rootReducer, devTools);
export default store;