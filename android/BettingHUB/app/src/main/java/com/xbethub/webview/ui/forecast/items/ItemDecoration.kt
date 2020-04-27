package com.xbethub.webview.ui.forecast.items

import android.graphics.Rect
import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.ui.forecast.items.items.ItemType

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

        when (itemType) {
            ItemType.FOOTER -> {
                outRect.top = footerTopSpace
                outRect.bottom = bottomSpace
            }

            ItemType.NEW_COMMENT -> {
                outRect.top = footerTopSpace
            }

            ItemType.HEADER -> {}

            else -> {
                outRect.top = if (pos == 1) topSpace else (if (itemType == ItemType.COMMENT_L1) itemSpace else 0)
                outRect.left = sideSpace
                outRect.right = sideSpace
            }
        }
    }
}
