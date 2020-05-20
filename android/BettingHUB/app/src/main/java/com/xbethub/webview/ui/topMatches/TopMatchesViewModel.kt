package com.xbethub.webview.ui.topMatches

import androidx.lifecycle.MutableLiveData
import com.xbethub.webview.BaseViewModel
import com.xbethub.webview.Event
import com.xbethub.webview.models.Bookmaker
import com.xbethub.webview.models.Event as Match

class TopMatchesViewModel: BaseViewModel() {
    val matchesLiveData = MutableLiveData<Event<List<Match>>>()

    init {
        appData.lastMatches?.let {
            matchesLiveData.value = Event.success(appData.lastMatches)
        } ?: kotlin.run {
            requestWithLiveData(matchesLiveData
                , { backendAPI.matches() }
                , {
                    appData.lastMatches = it
                    it
                }
            )
        }
    }
}
