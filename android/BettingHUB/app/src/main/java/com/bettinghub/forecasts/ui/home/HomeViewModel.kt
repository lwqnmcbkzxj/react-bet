package com.bettinghub.forecasts.ui.home

import androidx.lifecycle.MutableLiveData
import com.bettinghub.forecasts.BaseViewModel
import com.bettinghub.forecasts.Event
import com.bettinghub.forecasts.models.Event as Match
import com.bettinghub.forecasts.enums.Direction
import com.bettinghub.forecasts.enums.TimeInterval
import com.bettinghub.forecasts.models.Bookmaker
import com.bettinghub.forecasts.models.Forecast
import com.bettinghub.forecasts.models.User

class HomeViewModel: BaseViewModel() {

    val forecastersLiveData = MutableLiveData<Event<List<User>>>()
    val forecastsLiveData = MutableLiveData<Event<List<Forecast>>>()
    val matchesLiveData = MutableLiveData<Event<List<Match>>>()
    val bookmakersLiveData = MutableLiveData<Event<List<Bookmaker>>>()

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
                    appData.lastForecasts = it.data
                    it.data
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
        appData.lastBookmakers?.let {
            bookmakersLiveData.value = Event.success(appData.lastBookmakers)
        } ?: run {
            requestWithLiveData(bookmakersLiveData
                , { backendAPI.bookmakers() }
                , {
                    appData.lastBookmakers = it
                    it
                }
            )
        }
    }
}
