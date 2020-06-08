package com.bettinghub.forecasts.ui.forecasterRating

import androidx.lifecycle.MutableLiveData
import com.bettinghub.forecasts.App
import com.bettinghub.forecasts.BaseViewModel
import com.bettinghub.forecasts.Event
import com.bettinghub.forecasts.enums.Direction
import com.bettinghub.forecasts.enums.RatingTimeInterval
import com.bettinghub.forecasts.models.Sport
import com.bettinghub.forecasts.models.User
import com.bettinghub.forecasts.ui.forecasts.sportItem.SportListener

class ForecasterRatingViewModel : BaseViewModel(), SportListener {
    val ratingsLiveData = MutableLiveData<Event<List<User>>>()
    val clearRatingsLiveData = MutableLiveData<Void?>()
    val filterLiveData = MutableLiveData(RatingFilter())


    var lastRequestId: String? = null

    override fun onCreate() {
//        reloadForecasters()
    }

    private fun reloadForecasters() {
        clearRatingsLiveData.value = null

        lastRequestId = requestWithLiveData(ratingsLiveData
            ,
            {
                backendAPI.users(
                    "Bearer ${App.appComponent.getAppData().activeUser?.accessToken}",
                    consts.topForecastersCount,
                    1,
                    Direction.DESC.backendValue,
                    filterLiveData.value?.sport?.id,
                    filterLiveData.value?.timeInterval?.ordinal
                )
            }
            ,
            {
                appData.lastTopForecasters = it.data
                it.data
            })
    }

    fun onTimeIntervalClick(timeInterval: RatingTimeInterval) {
        if (timeInterval != filterLiveData.value!!.timeInterval) {
            lastRequestId?.let {
                disposeRequest(it)
                lastRequestId = null
            }
            filterLiveData.value!!.timeInterval = timeInterval
            filterLiveData.value = filterLiveData.value

            reloadForecasters()
        }
    }

    // SportListener
    override fun onSportItemClick(sport: Sport) {
        if (sport != filterLiveData.value!!.sport) {
            if (filterLiveData.value!!.sport?.id != sport.id) {
                lastRequestId?.let {
                    disposeRequest(it)
                    lastRequestId = null
                }
                filterLiveData.value?.sport = sport
                filterLiveData.value = filterLiveData.value
                reloadForecasters()
            }
        }
    }
}
