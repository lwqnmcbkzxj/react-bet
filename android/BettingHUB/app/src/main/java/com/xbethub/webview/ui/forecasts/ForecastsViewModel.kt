package com.xbethub.webview.ui.forecasts

import android.annotation.SuppressLint
import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.xbethub.webview.backend.BettingHubBackend
import com.xbethub.webview.backend.requests.ForecastsListRequest
import com.xbethub.webview.enums.ForecastType
import com.xbethub.webview.enums.Sport
import com.xbethub.webview.enums.TimeInterval
import com.xbethub.webview.models.Forecast
import com.xbethub.webview.models.ForecastFilter
import com.xbethub.webview.ui.forecasts.sportItem.SportListener
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.functions.Consumer
import io.reactivex.schedulers.Schedulers
import java.util.*
import kotlin.collections.ArrayList

class ForecastsViewModel: ViewModel(), SportListener {
    // TODO: сделать глобальным, даггер заюзать
    private val backend: BettingHubBackend = BettingHubBackend()

    private val forecasts = ArrayList<Forecast>()
    private val forecastFilter = ForecastFilter()

    val forecastsLiveData = MutableLiveData<List<Forecast>>()
    val forecastsClearLiveData = MutableLiveData<Void?>()
    val forecastFilterLiveData = MutableLiveData<ForecastFilter>()

    private val forecastListRequest = ForecastsListRequest(0, 5, Sport.ALL.backendValue
        , TimeInterval.ALL.backendValue,0, 0)

    fun onCreate() {
        reloadForecasts()

        forecastsLiveData.value = Collections.emptyList()
        forecastFilterLiveData.value = forecastFilter
    }

    @SuppressLint("CheckResult")
    private fun reloadForecasts() {
        forecastListRequest.page = 0
        forecasts.clear()
        forecastsClearLiveData.value = null

        backend.api.forecastList(forecastListRequest)
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe({
                forecasts.addAll(it)
                forecastsLiveData.value = forecasts
            }, {
                it.printStackTrace()
            })
    }

    @SuppressLint("CheckResult")
    fun onShowMoreBtnClick() {
        forecastListRequest.page++

        backend.api.forecastList(forecastListRequest)
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe({
                forecasts.addAll(it)
                forecastsLiveData.value = it
            }, {
                it.printStackTrace()
            })

    }

    fun onTimeIntervalSelected(timeInterval: TimeInterval) {
        if (timeInterval != forecastFilter.timeInterval) {
            forecastFilter.timeInterval = timeInterval
            forecastListRequest.timeInterval = timeInterval.backendValue

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

            forecastListRequest.sport = sport.backendValue

            reloadForecasts()
        }
    }
}
