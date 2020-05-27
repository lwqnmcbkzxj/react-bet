package com.bettinghub.forecasts.ui.bookmaker.items.items

class ShowMoreItem(val items: List<Item>): Item {

    override fun getType(): ItemType {
        return ItemType.SHOW_MORE
    }
}
