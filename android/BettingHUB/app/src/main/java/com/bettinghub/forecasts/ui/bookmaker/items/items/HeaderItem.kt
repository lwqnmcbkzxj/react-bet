package com.bettinghub.forecasts.ui.bookmaker.items.items

import com.bettinghub.forecasts.models.Bookmaker

class HeaderItem(val bookmaker: Bookmaker?): Item {
    override fun getType(): ItemType {
        return ItemType.HEADER
    }
}
