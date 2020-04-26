package com.xbethub.webview.ui.forecasts

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.xbethub.webview.enums.ForecastType
import com.xbethub.webview.enums.Sport
import com.xbethub.webview.models.Forecast
import com.xbethub.webview.models.ForecastFilter
import com.xbethub.webview.ui.forecasts.sportItem.SportListener

class ForecastsViewModel: ViewModel(), SportListener {
    private val forecasts = ArrayList<Forecast>()
    private val forecastFilter = ForecastFilter()
    val forecastsLiveData = MutableLiveData<List<Forecast>>()
    val forecastFilterLiveData = MutableLiveData<ForecastFilter>()

    fun onCreate() {
        for (i in 0..4) {
            forecasts.add(Forecast(i.toString()))
        }

        forecastsLiveData.value = forecasts
        forecastFilterLiveData.value = forecastFilter
    }

    fun onShowMoreBtnClick() {
        val newForecasts = ArrayList<Forecast>()

        for (i in 0..4) {
            newForecasts.add(Forecast(i.toString()))
        }

        forecasts.addAll(newForecasts)
        forecastsLiveData.value = newForecasts
    }

    fun onForecastTypeBtnClick(type: ForecastType) {
        forecastFilter.forecastType = type
        forecastFilterLiveData.value = forecastFilter
    }

    // SportListener
    override fun onSportItemClick(sport: Sport) {
        forecastFilter.sport = sport
        forecastFilterLiveData.value = forecastFilter
    }
}
