package com.xbethub.webview.ui.profile.forecasts

import androidx.lifecycle.MediatorLiveData
import androidx.lifecycle.MutableLiveData
import com.google.gson.Gson
import com.xbethub.webview.BaseViewModel
import com.xbethub.webview.Event
import com.xbethub.webview.models.Forecast

class ForecastsViewModel: BaseViewModel() {

    val id = MutableLiveData<Int>()
    val forecastsLiveData = MediatorLiveData<Event<List<Forecast>>>()

    val gson = Gson()

    init {
        forecastsLiveData.addSource(id) {
            requestWithLiveData(forecastsLiveData, {
                backendAPI.userForecasts(it)
            }) {
                it.data
            }
        }
    }

}
