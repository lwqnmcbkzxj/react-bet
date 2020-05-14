package com.xbethub.webview.ui.home.forecasterItem

import com.xbethub.webview.models.User

interface ForecasterListener {
    fun onForecasterClick(user: User, position: Int)
}
