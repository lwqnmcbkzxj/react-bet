package com.xbethub.webview.ui.forecasts.forecastItem

import android.graphics.Rect
import android.view.View
import androidx.recyclerview.widget.RecyclerView

class ForecastItemDecoration(val topSpace: Int, val sideSpace: Int, val itemSpace: Int): RecyclerView.ItemDecoration() {

    override fun getItemOffsets(
        outRect: Rect,
        view: View,
        parent: RecyclerView,
        state: RecyclerView.State
    ) {
        val pos = parent.getChildAdapterPosition(view)

        outRect.left = sideSpace
        outRect.right = sideSpace
        outRect.top = if (pos == 0) topSpace else itemSpace
    }
}
