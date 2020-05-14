package com.xbethub.webview.ui.forecasterRating

import androidx.lifecycle.MutableLiveData
import com.xbethub.webview.BaseViewModel
import com.xbethub.webview.Event
import com.xbethub.webview.enums.Direction
import com.xbethub.webview.enums.RatingTimeInterval
import com.xbethub.webview.models.Sport
import com.xbethub.webview.models.User
import com.xbethub.webview.ui.forecasts.sportItem.SportListener

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
