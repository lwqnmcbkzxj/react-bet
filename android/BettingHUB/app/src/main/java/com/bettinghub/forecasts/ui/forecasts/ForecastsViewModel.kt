package com.bettinghub.forecasts.ui.forecasts

import android.annotation.SuppressLint
import androidx.lifecycle.MutableLiveData
import com.bettinghub.forecasts.BaseViewModel
import com.bettinghub.forecasts.Event
import com.bettinghub.forecasts.backend.requests.ForecastsRequest
import com.bettinghub.forecasts.enums.ForecastType
import com.bettinghub.forecasts.enums.TimeInterval
import com.bettinghub.forecasts.models.Forecast
import com.bettinghub.forecasts.models.Sport
import com.bettinghub.forecasts.ui.forecasts.sportItem.SportListener

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
            , {
                backendAPI.forecasts(forecastsRequest.limit, forecastsRequest.sportId, forecastsRequest.time, forecastsRequest.page)
            }
            , {
                it.data
            })
    }

    @SuppressLint("CheckResult")
    fun onShowMoreBtnClick() {
        forecastsRequest.page++

        requestWithLiveData(forecastsLiveData
            , { backendAPI.forecasts(forecastsRequest.limit, forecastsRequest.sportId, forecastsRequest.time, forecastsRequest.page) }
            , { it.data })
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
            forecastFilter.sport = sport
            forecastFilterLiveData.value = forecastFilter

            if (forecastsRequest.sportId != sport.id) {
                lastRequestId?.let {
                    disposeRequest(it)
                    lastRequestId = null
                }
                forecastsRequest.sportId = sport.id
                reloadForecasts()
            }
        }
    }
}
