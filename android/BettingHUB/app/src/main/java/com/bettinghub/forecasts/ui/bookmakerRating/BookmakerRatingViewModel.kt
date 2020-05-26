package com.bettinghub.forecasts.ui.bookmakerRating

import androidx.lifecycle.MutableLiveData
import com.bettinghub.forecasts.BaseViewModel
import com.bettinghub.forecasts.Event
import com.bettinghub.forecasts.models.Bookmaker

class BookmakerRatingViewModel: BaseViewModel() {
    val bookmakersLiveData = MutableLiveData<Event<List<Bookmaker>>>()

    init {
        appData.lastBookmakers?.let {
            bookmakersLiveData.value = Event.success(appData.lastBookmakers)
        } ?: run {
            requestWithLiveData(bookmakersLiveData
                , { backendAPI.bookmakers() }
                , {
                    appData.lastBookmakers = it
                    it
                }
            )
        }
    }
}
