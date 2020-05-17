package com.xbethub.webview.ui.bookmaker.items.viewHolders

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.databinding.ItemCommentShowMoreBinding
import com.xbethub.webview.ui.bookmaker.items.ItemListener
import com.xbethub.webview.ui.bookmaker.items.items.ShowMoreItem

class ShowMoreViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
    private val binding = ItemCommentShowMoreBinding.bind(itemView)
    lateinit var showMoreItem: ShowMoreItem

    fun setListener(listener: ItemListener) {
        binding.showMoreBtn.setOnClickListener { listener.onShowMoreBtnClick(showMoreItem, adapterPosition) }
    }
}
