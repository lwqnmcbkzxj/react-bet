package com.xbethub.webview.ui.home

import androidx.lifecycle.MutableLiveData
import com.xbethub.webview.BaseViewModel
import com.xbethub.webview.Event
import com.xbethub.webview.models.Event as Match
import com.xbethub.webview.enums.Direction
import com.xbethub.webview.enums.TimeInterval
import com.xbethub.webview.models.Forecast
import com.xbethub.webview.models.User

class HomeViewModel: BaseViewModel() {

    val forecastersLiveData = MutableLiveData<Event<List<User>>>()
    val forecastsLiveData = MutableLiveData<Event<List<Forecast>>>()
    val matchesLiveData = MutableLiveData<Event<List<Match>>>()

    override fun onCreate() {
        appData.lastTopForecasters?.let {
            forecastersLiveData.value = Event.success(appData.lastTopForecasters)
        } ?: run {
            requestWithLiveData(forecastersLiveData
                , { backendAPI.users(consts.topForecastersCount, 1, Direction.DESC.backendValue) }
                , {
                    appData.lastTopForecasters = it.data
                    it.data
                }
            )
        }

        appData.lastForecasts?.let {
            forecastsLiveData.value = Event.success(appData.lastForecasts)
        } ?: run {
            requestWithLiveData(forecastsLiveData
                , { backendAPI.forecasts(consts.lastForecastsCount, 0, TimeInterval.ALL.backendValue, 1) }
                , {
                    appData.lastForecasts = it
                    it
                }
            )
        }

        appData.lastMatches?.let {
            matchesLiveData.value = Event.success(appData.lastMatches)
        } ?: run {
            requestWithLiveData(matchesLiveData
                , { backendAPI.matches() }
                , {
                    appData.lastMatches = it
                    it
                }
            )
        }
    }
}
