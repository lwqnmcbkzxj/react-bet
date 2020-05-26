package com.bettinghub.forecasts.ui.match.items.items

import com.bettinghub.forecasts.ui.forecasterRating.ForecasterRating

class ForecasterTableLineItem(val forecasterRating: ForecasterRating): Item {
    override fun getType(): ItemType {
        return ItemType.FORECASTER_TABLE_LINE
    }
}
