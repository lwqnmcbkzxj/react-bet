package com.xbethub.webview.ui.forecasterRating

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.xbethub.webview.enums.RatingTimeInterval
import com.xbethub.webview.enums.Sport
import com.xbethub.webview.models.ForecasterRating
import com.xbethub.webview.ui.forecasts.sportItem.SportListener
import java.util.*
import kotlin.collections.ArrayList

class ForecasterRatingViewModel: ViewModel(), SportListener {
    val ratingsLiveData = MutableLiveData<List<ForecasterRating>>()
    val clearRatingsLiveData = MutableLiveData<Void?>()
    val filterLiveData = MutableLiveData<RatingFilter>()

    private val ratings = ArrayList<ForecasterRating>()
    private var filter = RatingFilter()

    fun onCreate() {
        val max = 15

        for (i in 1..max) {
            ratings.add(ForecasterRating(i, max))
        }

        ratingsLiveData.value = ratings
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
