package com.bettinghub.forecasts.ui.home.matchItem.items

import com.bettinghub.forecasts.models.Event

class MatchItem(val match: Event?, val last: Boolean):
    MatchTableItemBase {
    override fun getItemType(): MatchTableItemType {
        return MatchTableItemType.MATCH
    }
}
