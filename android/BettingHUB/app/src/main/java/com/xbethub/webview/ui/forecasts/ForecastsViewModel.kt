package com.xbethub.webview.ui.forecasts

import android.annotation.SuppressLint
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.xbethub.webview.App
import com.xbethub.webview.backend.BettingHubBackend
import com.xbethub.webview.backend.requests.ForecastsRequest
import com.xbethub.webview.enums.ForecastType
import com.xbethub.webview.enums.TimeInterval
import com.xbethub.webview.models.Forecast
import com.xbethub.webview.models.Sport
import com.xbethub.webview.ui.forecasts.sportItem.SportListener
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import java.util.*
import kotlin.collections.ArrayList

class ForecastsViewModel: ViewModel(), SportListener {
    private val backend: BettingHubBackend = App.appComponent.getBackend()

    private val forecasts = ArrayList<Forecast?>()
    private val forecastFilter = ForecastFilter()

    val forecastsLiveData = MutableLiveData<List<Forecast?>>()
    val forecastsClearLiveData = MutableLiveData<Void?>()
    val forecastFilterLiveData = MutableLiveData<ForecastFilter>()

    private val forecastListRequest = ForecastsRequest(1, 0
        , TimeInterval.ALL.backendValue, 15)

    fun onCreate() {
        reloadForecasts()
        //forecastsLiveData.value = Collections.emptyList()

        forecastFilterLiveData.value = forecastFilter
    }


    @SuppressLint("CheckResult")
    private fun reloadForecasts() {
        forecasts.clear()

        for (i in 1..5) {
            forecasts.add(null)
        }

        forecastsLiveData.value = forecasts

//        forecastListRequest.page = 1
//        forecasts.clear()
//        forecastsClearLiveData.value = null
//
//        backend.api.forecasts(forecastListRequest.limit, forecastListRequest.sportId, forecastListRequest.time, forecastListRequest.page)
//            .subscribeOn(Schedulers.io())
//            .observeOn(AndroidSchedulers.mainThread())
//            .subscribe({
//                forecasts.addAll(it.data)
//                forecastsLiveData.value = forecasts
//            }, {
//                it.printStackTrace()
//            })
    }

    @SuppressLint("CheckResult")
    fun onShowMoreBtnClick() {
        forecastListRequest.page++

//        backend.api.forecasts(forecastListRequest.limit, forecastListRequest.sportId, forecastListRequest.time, forecastListRequest.page)
//            .subscribeOn(Schedulers.io())
//            .observeOn(AndroidSchedulers.mainThread())
//            .subscribe({
//                forecasts.addAll(it.data)
//                forecastsLiveData.value = forecasts
//            }, {
//                it.printStackTrace()
//            })

        val newForecasts = ArrayList<Forecast?>()

        for (i in 1..5) {
            newForecasts.add(null)
        }

        forecasts.addAll(newForecasts)

        forecastsLiveData.value = newForecasts
    }

    fun onTimeIntervalSelected(timeInterval: TimeInterval) {
        if (timeInterval != forecastFilter.timeInterval) {
            forecastFilter.timeInterval = timeInterval
            forecastListRequest.time = timeInterval.backendValue

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
            val isNull = forecastFilter.sport == null

            forecastFilter.sport = sport
            forecastFilterLiveData.value = forecastFilter

            forecastListRequest.sportId = sport.id

            if (!isNull) {
                reloadForecasts()
            }
        }
    }
}
