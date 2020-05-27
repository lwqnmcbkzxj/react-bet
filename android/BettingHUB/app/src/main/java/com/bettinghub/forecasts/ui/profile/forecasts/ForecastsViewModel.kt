package com.bettinghub.forecasts.ui.profile.forecasts

import androidx.lifecycle.MediatorLiveData
import androidx.lifecycle.MutableLiveData
import com.google.gson.Gson
import com.bettinghub.forecasts.BaseViewModel
import com.bettinghub.forecasts.Event
import com.bettinghub.forecasts.models.Forecast

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