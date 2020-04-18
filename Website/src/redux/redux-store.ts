import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"

import userReducer from "./user-reducer"
import forecastsReducer from "./forecasts-reducer"
import forecastReducer from "./forecast-reducer"
import appReducer from "./app-reducer"
import liveCommentsReducer from "./liveComments-reducer"
import { reducer as formReducer } from "redux-form";


let rootReducer = combineReducers({    
	user: userReducer,
	app: appReducer,
	liveComments: liveCommentsReducer,



	
	forecasts: forecastsReducer,
	forecast: forecastReducer,

    form: formReducer
}); 


export type RootReducerType = typeof rootReducer

const store = createStore(rootReducer,composeWithDevTools (applyMiddleware(thunkMiddleware)));
export default store;