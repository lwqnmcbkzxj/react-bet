package com.bettinghub.forecasts.ui.match.items.items

import com.bettinghub.forecasts.models.Event

class HeaderItem(val match: Event): Item {
    override fun getType(): ItemType {
        return ItemType.HEADER
    }
}
