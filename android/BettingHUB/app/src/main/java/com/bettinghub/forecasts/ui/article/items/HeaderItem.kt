package com.bettinghub.forecasts.ui.article.items

import com.bettinghub.forecasts.models.Article

class HeaderItem(val article: Article): Item {
    override fun getType(): ItemType {
        return ItemType.HEADER
    }
}
