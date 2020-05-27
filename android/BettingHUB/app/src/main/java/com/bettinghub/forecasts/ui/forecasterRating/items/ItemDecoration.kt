package com.bettinghub.forecasts.ui.forecasterRating.items

import android.graphics.Rect
import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.ui.forecasterRating.items.items.ItemType
import com.bettinghub.forecasts.ui.forecasterRating.items.items.TableLineItem

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

        (parent.adapter as? ItemAdapter)?.let {
            val item = it.getItem(pos)
            val itemType = item.getType()

            when (itemType) {
                ItemType.HEADER -> {}

                ItemType.TABLE_HEADER -> {
                    outRect.left = sideSpace
                    outRect.right = sideSpace
                    outRect.top = topSpace
                }

                ItemType.TABLE_LINE -> {
                    outRect.left = sideSpace
                    outRect.right = sideSpace

                    (item as TableLineItem).let {
                        if (it.forecasterRating.number != 1) {
                            outRect.top = itemSpace
                        }
                    }
                }

                ItemType.FOOTER -> {
                    outRect.top = footerTopSpace
                    outRect.bottom = bottomSpace
                }
            }
        }
    }
}
