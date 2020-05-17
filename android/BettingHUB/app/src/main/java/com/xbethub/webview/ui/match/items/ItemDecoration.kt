package com.xbethub.webview.ui.match.items

import android.graphics.Rect
import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.ui.match.items.items.ForecasterTableLineItem
import com.xbethub.webview.ui.match.items.items.ItemType

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
        val itemType = (parent.adapter as ItemAdapter).getItem(pos).getType()

        when (itemType) {
            ItemType.FOOTER -> {
                outRect.top = footerTopSpace
                outRect.bottom = bottomSpace
            }

            ItemType.FORECASTER_TABLE_HEADER -> {
                outRect.left = sideSpace
                outRect.right = sideSpace
                outRect.top = topSpace
            }

            ItemType.FORECASTER_TABLE_LINE -> {
                outRect.left = sideSpace
                outRect.right = sideSpace
//                val item = (parent.adapter as ItemAdapter).getItem(pos)
//                (item as ForecasterTableLineItem).let {
//                    if (it.forecasterRating.number != 1) {
//                        outRect.top = itemSpace
//                    }
//                }
            }

            ItemType.NEW_COMMENT -> {
                outRect.top = footerTopSpace
            }

            ItemType.HEADER -> {}

            else -> {
                outRect.top = if (pos == 17) topSpace else (if (itemType == ItemType.COMMENT_L1) itemSpace else 0)
                outRect.left = sideSpace
                outRect.right = sideSpace
            }
        }
    }
}
