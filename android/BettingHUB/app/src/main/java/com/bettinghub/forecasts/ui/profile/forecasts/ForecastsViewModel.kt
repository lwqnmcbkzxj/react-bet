package com.bettinghub.forecasts.ui.profile.forecasts

import androidx.lifecycle.*
import com.bettinghub.forecasts.BaseViewModel
import com.bettinghub.forecasts.Event
import com.bettinghub.forecasts.models.Forecast
import com.google.gson.Gson

class ForecastsViewModel: BaseViewModel() {

    val id = MutableLiveData<Int>()
    val forecastsLiveData = MediatorLiveData<Event<List<Forecast>>>()

    val gson = Gson()

    init {
        forecastsLiveData.addSource(id) {
            requestWithLiveData(forecastsLiveData, {
                if (it == -1) {
                    backendAPI.favorite("Bearer ${appData.activeUser?.accessToken}")
                } else {
                    backendAPI.userForecasts(it).map {
                        it.data
                    }
                }
            }) {
                it
            }
        }
    }
}
