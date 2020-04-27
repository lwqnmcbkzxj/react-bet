package com.xbethub.webview.ui.home.recycler_view_adapters

import android.graphics.Rect
import android.view.View
import androidx.recyclerview.widget.RecyclerView

class ItemDecoration(val topSpace: Int, val bottomSpace: Int): RecyclerView.ItemDecoration() {

    override fun getItemOffsets(
        outRect: Rect,
        view: View,
        parent: RecyclerView,
        state: RecyclerView.State
    ) {
        outRect.top = topSpace
        outRect.bottom = bottomSpace
    }
}
