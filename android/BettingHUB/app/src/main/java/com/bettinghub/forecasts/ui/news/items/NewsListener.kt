package com.bettinghub.forecasts.ui.news.items

import com.bettinghub.forecasts.models.News

interface NewsListener {
    fun onNewsClick(news: News, position: Int)
}
