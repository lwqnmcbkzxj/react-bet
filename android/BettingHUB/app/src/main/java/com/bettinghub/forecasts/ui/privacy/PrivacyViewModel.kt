package com.bettinghub.forecasts.ui.privacy

import androidx.lifecycle.MutableLiveData
import com.bettinghub.forecasts.BaseViewModel
import com.bettinghub.forecasts.Event

class PrivacyViewModel: BaseViewModel() {

    val privacyText = MutableLiveData<Event<String>>()

    init {
            requestWithLiveData(privacyText
                , { backendAPI.privacy() }
                , {
                    it.text
                }
            )

    }

}
