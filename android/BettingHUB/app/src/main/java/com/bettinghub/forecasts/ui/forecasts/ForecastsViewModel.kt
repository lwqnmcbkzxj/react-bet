package com.bettinghub.forecasts.ui.forecasts

import android.annotation.SuppressLint
import androidx.lifecycle.MediatorLiveData
import androidx.lifecycle.MutableLiveData
import com.bettinghub.forecasts.App
import com.bettinghub.forecasts.BaseViewModel
import com.bettinghub.forecasts.Event
import com.bettinghub.forecasts.backend.requests.ForecastsRequest
import com.bettinghub.forecasts.enums.ForecastType
import com.bettinghub.forecasts.enums.TimeInterval
import com.bettinghub.forecasts.models.Forecast
import com.bettinghub.forecasts.models.Sport
import com.bettinghub.forecasts.ui.forecasts.sportItem.SportListener

class ForecastsViewModel: BaseViewModel(), SportListener {

    val forecastFilter = MutableLiveData(ForecastFilter())

    val forecastsLiveData = MutableLiveData<Event<List<Forecast>>>()
    val clearForecastsLiveData = MutableLiveData<Void?>()

    private val forecastsRequest = ForecastsRequest(1, 0
        , TimeInterval.ALL.backendValue, consts.forecastsPerPage)

    override fun onCreate() {
        reloadForecasts()
    }

    var lastRequestId: String? = null

    @SuppressLint("CheckResult")
    private fun reloadForecasts() {
        clearForecastsLiveData.value = null

        lastRequestId = if (forecastFilter.value!!.forecastType == ForecastType.ALL) {
            requestWithLiveData(forecastsLiveData
                , {
                    backendAPI.forecasts(
                        "Bearer ${App.appComponent.getAppData().activeUser?.accessToken}",
                        forecastsRequest.limit,
                        forecastsRequest.sportId,
                        forecastsRequest.time,
                        forecastsRequest.page
                    )
                }
                , {
                    it.data
                })
        } else {
            requestWithLiveData(forecastsLiveData
                , {
                    backendAPI.subscriptionForecasts(
                        appData.activeUser?.id,
                        "Bearer ${App.appComponent.getAppData().activeUser?.accessToken}",
                        forecastsRequest.limit,
                        forecastsRequest.sportId,
                        forecastsRequest.time,
                        forecastsRequest.page
                    )
                }
                , {
                    it.data
                })
        }
    }

    @SuppressLint("CheckResult")
    fun onShowMoreBtnClick() {
        forecastsRequest.page++

        requestWithLiveData(forecastsLiveData
            , { backendAPI.forecasts("Bearer ${App.appComponent.getAppData().activeUser?.accessToken}", forecastsRequest.limit, forecastsRequest.sportId, forecastsRequest.time, forecastsRequest.page) }
            , { it.data })
    }

    fun onTimeIntervalSelected(timeInterval: TimeInterval) {
        if (timeInterval != forecastFilter.value!!.timeInterval) {
            lastRequestId?.let {
                disposeRequest(it)
                lastRequestId = null
            }
            forecastFilter.value!!.timeInterval = timeInterval
            forecastFilter.value = forecastFilter.value
            forecastsRequest.time = timeInterval.backendValue

            reloadForecasts()
        }
    }

    fun onForecastTypeBtnClick(type: ForecastType) {
        if (type != forecastFilter.value!!.forecastType) {
            forecastFilter.value!!.forecastType = type
            forecastFilter.value = forecastFilter.value
            reloadForecasts()
        }
    }

    // SportListener
    override fun onSportItemClick(sport: Sport) {
        if (sport != forecastFilter.value!!.sport) {
            forecastFilter.value!!.sport = sport
            forecastFilter.value = forecastFilter.value

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
