package com.bettinghub.forecasts.ui.bookmakerRating.items.items

import com.bettinghub.forecasts.models.Bookmaker

class BookmakerItem(val bookmaker: Bookmaker?, val last: Boolean):
    BookmakerTableItemBase {
    override fun getItemType(): BookmakerTableItemType {
        return BookmakerTableItemType.BOOKMAKER
    }
}
