package com.xbethub.webview.ui.home.forecasterItem

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.databinding.ItemForecasterBinding

class ForecasterItemViewHolder(val width: Int, itemView: View): RecyclerView.ViewHolder(itemView) {
    private val binding = ItemForecasterBinding.bind(itemView)

    init {
        binding.main.layoutParams.width = width
    }
}
