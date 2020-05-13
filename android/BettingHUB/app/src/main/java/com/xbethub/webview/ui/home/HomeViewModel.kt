package com.xbethub.webview.ui.home

import androidx.lifecycle.MutableLiveData
import com.xbethub.webview.BaseViewModel
import com.xbethub.webview.Event
import com.xbethub.webview.enums.Direction
import com.xbethub.webview.models.User

class HomeViewModel: BaseViewModel() {

    val forecastersLiveData = MutableLiveData<Event<List<User>>>()

    override fun onCreate() {
        requestWithLiveData(forecastersLiveData
            , {backendAPI.users(consts.homeForecasterCount, 1, Direction.DESC.backendValue)}
            , {it.data});
    }
}
