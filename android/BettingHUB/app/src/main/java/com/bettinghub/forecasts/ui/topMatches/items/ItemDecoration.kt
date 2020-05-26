package com.bettinghub.forecasts.ui.topMatches.items

import android.graphics.Rect
import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.ui.bookmakerRating.items.items.BookmakerTableItemType

class ItemDecoration(val topSpace: Int, val sideSpace: Int, val itemSpace: Int
                     , val footerTopSpace: Int, val bottomSpace: Int): RecyclerView.ItemDecoration() {

    override fun getItemOffsets(
        outRect: Rect,
        view: View,
        parent: RecyclerView,
        state: RecyclerView.State
    ) {
        val pos = parent.getChildAdapterPosition(view)

        if (pos < 0) {
            return
        }

        (parent.adapter as? MatchItemAdapter)?.let {
            val item = it.getItem(pos)
            val itemType = item.getItemType()

            when (itemType) {
                BookmakerTableItemType.HEADER -> {}

                BookmakerTableItemType.BOOKMAKER -> { }

                BookmakerTableItemType.FOOTER -> {
                    outRect.top = footerTopSpace
                    outRect.bottom = bottomSpace
                }
            }
        }
    }
}
