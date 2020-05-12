package com.xbethub.webview.ui.home.forecasterItem

import android.graphics.Rect
import android.view.View
import androidx.recyclerview.widget.RecyclerView

class ForecasterItemDecoration(val itemSpace: Int): RecyclerView.ItemDecoration() {

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

        outRect.left = if (pos == 0) 0 else itemSpace
    }
}
