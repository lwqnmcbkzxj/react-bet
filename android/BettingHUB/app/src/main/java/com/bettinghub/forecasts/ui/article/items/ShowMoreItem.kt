package com.bettinghub.forecasts.ui.article.items

class ShowMoreItem(val items: List<Item>): Item {

    override fun getType(): ItemType {
        return ItemType.SHOW_MORE
    }
}
