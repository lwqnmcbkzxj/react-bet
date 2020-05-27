package com.bettinghub.forecasts.ui.forecasterRating

import androidx.lifecycle.MutableLiveData
import com.bettinghub.forecasts.BaseViewModel
import com.bettinghub.forecasts.Event
import com.bettinghub.forecasts.enums.Direction
import com.bettinghub.forecasts.enums.RatingTimeInterval
import com.bettinghub.forecasts.models.Sport
import com.bettinghub.forecasts.models.User
import com.bettinghub.forecasts.ui.forecasts.sportItem.SportListener

class ForecasterRatingViewModel: BaseViewModel(), SportListener {
    val ratingsLiveData = MutableLiveData<Event<List<User>>>()
    val clearRatingsLiveData = MutableLiveData<Void?>()
    val filterLiveData = MutableLiveData<RatingFilter>()
    private var filter = RatingFilter()

    override fun onCreate() {

        appData.lastTopForecasters?.let {
            ratingsLiveData.value = Event.success(it)
        } ?: run {
            requestWithLiveData(ratingsLiveData
                , { backendAPI.users(consts.topForecastersCount, 1, Direction.DESC.backendValue) }
                , {
                    appData.lastTopForecasters = it.data
                    it.data
                })
        }

        filterLiveData.value = filter
    }

    fun onTimeIntervalClick(timeInterval: RatingTimeInterval) {
        if (filter.timeInterval != timeInterval) {
            filter.timeInterval = timeInterval
            filterLiveData.value = filter
        }
    }

    // SportListener
    override fun onSportItemClick(sport: Sport) {
        if (filter.sport != sport) {
            filter.sport = sport
            filterLiveData.value = filter
        }
    }
}
