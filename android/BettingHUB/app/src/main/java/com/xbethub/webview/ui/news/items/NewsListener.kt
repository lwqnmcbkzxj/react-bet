package com.xbethub.webview.ui.news.items

import com.xbethub.webview.models.News

interface NewsListener {
    fun onNewsClick(news: News, position: Int)
}
