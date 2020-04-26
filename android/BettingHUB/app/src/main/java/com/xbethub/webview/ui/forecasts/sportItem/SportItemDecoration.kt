package com.xbethub.webview.ui.forecasts.sportItem

import android.content.Context
import android.graphics.Rect
import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.google.android.flexbox.FlexboxItemDecoration
import com.google.android.flexbox.FlexboxLayoutManager

class SportItemDecoration(var context: Context): FlexboxItemDecoration(context) {

    override fun getItemOffsets(
        outRect: Rect,
        view: View,
        parent: RecyclerView,
        state: RecyclerView.State
    ) {
        val lm = parent.layoutManager as FlexboxLayoutManager
    }
}
