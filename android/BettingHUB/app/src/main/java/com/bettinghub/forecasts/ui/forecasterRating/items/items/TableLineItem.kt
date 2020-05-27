package com.bettinghub.forecasts.ui.forecasterRating.items.items

import com.bettinghub.forecasts.ui.forecasterRating.ForecasterRating

class TableLineItem(val forecasterRating: ForecasterRating): Item {
    override fun getType(): ItemType {
        return ItemType.TABLE_LINE
    }
}
