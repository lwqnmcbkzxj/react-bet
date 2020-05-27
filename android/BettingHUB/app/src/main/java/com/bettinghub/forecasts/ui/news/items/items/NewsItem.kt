package com.bettinghub.forecasts.ui.news.items.items

import com.bettinghub.forecasts.models.News

class NewsItem(val news: News?): Item {
    override fun getType(): ItemType {
        return ItemType.NEWS
    }
}
