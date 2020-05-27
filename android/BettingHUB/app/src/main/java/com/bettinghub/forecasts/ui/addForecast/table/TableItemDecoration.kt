package com.bettinghub.forecasts.ui.addForecast.table

import android.graphics.Rect
import android.view.View
import androidx.recyclerview.widget.RecyclerView

class TableItemDecoration(val space: Int): RecyclerView.ItemDecoration() {
    override fun getItemOffsets(
        outRect: Rect,
        view: View,
        parent: RecyclerView,
        state: RecyclerView.State
    ) {
        outRect.top = space
    }
}
