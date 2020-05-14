package com.xbethub.webview

import com.xbethub.webview.models.ActiveUser
import com.xbethub.webview.models.Forecast
import com.xbethub.webview.models.User

class AppData {
    var activeUser: ActiveUser? = null
    var lastTopForecasters: List<User>? = null
    var lastForecasts: List<Forecast>? = null
}
