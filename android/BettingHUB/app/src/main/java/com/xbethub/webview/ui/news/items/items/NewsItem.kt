package com.xbethub.webview.ui.news.items.items

import com.xbethub.webview.models.News

class NewsItem(val news: News?): Item {
    override fun getType(): ItemType {
        return ItemType.NEWS
    }
}
