package com.xbethub.webview.ui.privacy

import androidx.lifecycle.MutableLiveData
import com.xbethub.webview.BaseViewModel
import com.xbethub.webview.Event

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
