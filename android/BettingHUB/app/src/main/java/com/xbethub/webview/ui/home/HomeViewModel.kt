package com.xbethub.webview.ui.home

import androidx.lifecycle.MutableLiveData
import com.xbethub.webview.BaseViewModel
import com.xbethub.webview.Event
import com.xbethub.webview.enums.Direction
import com.xbethub.webview.enums.TimeInterval
import com.xbethub.webview.models.Forecast
import com.xbethub.webview.models.User
import java.sql.Time

class HomeViewModel: BaseViewModel() {
    val forecastersLiveData = MutableLiveData<Event<List<User>>>()
    val forecastsLiveData = MutableLiveData<Event<List<Forecast>>>()

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
            );
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
    }
}
