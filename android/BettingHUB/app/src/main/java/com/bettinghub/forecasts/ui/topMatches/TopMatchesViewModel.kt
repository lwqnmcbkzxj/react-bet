package com.bettinghub.forecasts.ui.topMatches

import androidx.lifecycle.MutableLiveData
import com.bettinghub.forecasts.BaseViewModel
import com.bettinghub.forecasts.Event
import com.bettinghub.forecasts.models.Event as Match

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
