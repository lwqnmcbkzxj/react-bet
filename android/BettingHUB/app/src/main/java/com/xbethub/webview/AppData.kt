package com.xbethub.webview

import com.xbethub.webview.models.*
import com.xbethub.webview.models.Event

class AppData {
    var activeUser: ActiveUser? = null
    var lastTopForecasters: List<User>? = null
    var lastForecasts: List<Forecast>? = null
    var lastMatches: List<Event>? = null
    var lastBookmakers: List<Bookmaker>? = null
    var articles: List<Article>? = null
}
