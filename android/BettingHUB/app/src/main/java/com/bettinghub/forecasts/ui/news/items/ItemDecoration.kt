package com.bettinghub.forecasts.ui.news.items

import android.graphics.Rect
import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.ui.news.items.items.ItemType

class ItemDecoration(val topSpace: Int, val sideSpace: Int, val itemSpace: Int
                     , val showMoreTopSpace: Int, val footerTopSpace: Int, val bottomSpace: Int): RecyclerView.ItemDecoration() {

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

        (parent.adapter as? ItemAdapter)?.let {
            val itemType = it.getItem(pos).getType()

            when (itemType) {
                ItemType.HEADER -> {}

                ItemType.NEWS -> {
                    outRect.left = sideSpace
                    outRect.right = sideSpace
                    outRect.top = if (pos == 1) topSpace else itemSpace
                }

                ItemType.SHOW_MORE -> {
                    outRect.top = showMoreTopSpace
                }

                ItemType.FOOTER -> {
                    outRect.top = footerTopSpace
                    outRect.bottom = bottomSpace
                }
            }
        } ?: run {
            outRect.left = sideSpace
            outRect.right = sideSpace
            outRect.top = if (pos == 0) 0 else itemSpace
        }

    }
}
