package com.bettinghub.forecasts.ui.forecast.items

import android.graphics.Rect
import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.ui.forecast.items.items.ItemType

class ItemDecoration(val topSpace: Int, val sideSpace: Int, val itemSpace: Int
                     , val footerTopSpace: Int, val bottomSpace: Int): RecyclerView.ItemDecoration() {


    override fun getItemOffsets(
        outRect: Rect,
        view: View,
        parent: RecyclerView,
        state: RecyclerView.State
    ) {
        val pos = parent.getChildAdapterPosition(view)
        val itemType = (parent.adapter as ItemAdapter).getItem(pos).getType()
        println(itemType)
        when (itemType) {
            ItemType.FOOTER -> {
                outRect.top = footerTopSpace
                outRect.bottom = bottomSpace
            }

            ItemType.NEW_COMMENT -> {
                outRect.top = footerTopSpace
            }

            ItemType.HEADER -> {}

            ItemType.COMMENT_L0, ItemType.COMMENT_L1, ItemType.COMMENT_L2, ItemType.COMMENT_L3 -> {
                outRect.top = itemSpace
                outRect.bottom = itemSpace
                outRect.left = sideSpace
                outRect.right = sideSpace
            }
            else -> {
                outRect.top = if (pos == 1) topSpace else (if (itemType == ItemType.COMMENT_L1) itemSpace else 0)
                outRect.left = sideSpace
                outRect.right = sideSpace
            }
        }
    }
}