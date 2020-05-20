package com.xbethub.webview.ui.bookmakerRating

import androidx.lifecycle.MutableLiveData
import com.xbethub.webview.BaseViewModel
import com.xbethub.webview.Event
import com.xbethub.webview.models.Bookmaker

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
