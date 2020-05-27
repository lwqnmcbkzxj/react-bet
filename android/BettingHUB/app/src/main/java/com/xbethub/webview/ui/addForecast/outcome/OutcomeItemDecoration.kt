package com.xbethub.webview.ui.addForecast.outcome

import android.graphics.Rect
import android.view.View
import androidx.recyclerview.widget.RecyclerView

class OutcomeItemDecoration(val space: Int): RecyclerView.ItemDecoration() {
    override fun getItemOffsets(
        outRect: Rect,
        view: View,
        parent: RecyclerView,
        state: RecyclerView.State
    ) {
        outRect.top = if (parent.getChildAdapterPosition(view) == 0) 0 else space
    }
}
