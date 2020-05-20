package com.xbethub.webview.ui.forecasts

import android.annotation.SuppressLint
import androidx.lifecycle.MutableLiveData
import com.xbethub.webview.BaseViewModel
import com.xbethub.webview.Event
import com.xbethub.webview.backend.requests.ForecastsRequest
import com.xbethub.webview.enums.ForecastType
import com.xbethub.webview.enums.TimeInterval
import com.xbethub.webview.models.Forecast
import com.xbethub.webview.models.Sport
import com.xbethub.webview.ui.forecasts.sportItem.SportListener
import kotlin.collections.ArrayList

class ForecastsViewModel: BaseViewModel(), SportListener {
    private val forecastFilter = ForecastFilter()

    val forecastsLiveData = MutableLiveData<Event<List<Forecast>>>()
    val clearForecastsLiveData = MutableLiveData<Void?>()
    val forecastFilterLiveData = MutableLiveData<ForecastFilter>()

    private val forecastsRequest = ForecastsRequest(1, 0
        , TimeInterval.ALL.backendValue, consts.forecastsPerPage)

    override fun onCreate() {
        reloadForecasts()

        forecastFilterLiveData.value = forecastFilter
    }

    var lastRequestId: String? = null

    @SuppressLint("CheckResult")
    private fun reloadForecasts() {
        clearForecastsLiveData.value = null

        lastRequestId = requestWithLiveData(forecastsLiveData
            , { backendAPI.forecasts(forecastsRequest.limit, forecastsRequest.sportId, forecastsRequest.time, forecastsRequest.page) }
            , { it })
    }

    @SuppressLint("CheckResult")
    fun onShowMoreBtnClick() {
        forecastsRequest.page++

        requestWithLiveData(forecastsLiveData
            , { backendAPI.forecasts(forecastsRequest.limit, forecastsRequest.sportId, forecastsRequest.time, forecastsRequest.page) }
            , { it })
    }

    fun onTimeIntervalSelected(timeInterval: TimeInterval) {
        if (timeInterval != forecastFilter.timeInterval) {
            lastRequestId?.let {
                disposeRequest(it)
                lastRequestId = null
            }
            forecastFilter.timeInterval = timeInterval
            forecastsRequest.time = timeInterval.backendValue

            reloadForecasts()
        }
    }

    fun onForecastTypeBtnClick(type: ForecastType) {
        if (type != forecastFilter.forecastType) {
            forecastFilter.forecastType = type
            forecastFilterLiveData.value = forecastFilter
        }
    }

    // SportListener
    override fun onSportItemClick(sport: Sport) {
        if (sport != forecastFilter.sport) {
            lastRequestId?.let {
                disposeRequest(it)
                lastRequestId = null
            }
            forecastFilter.sport = sport
            forecastFilterLiveData.value = forecastFilter

            if (forecastsRequest.sportId != sport.id) {
                forecastsRequest.sportId = sport.id
                reloadForecasts()
            }
        }
    }
}
