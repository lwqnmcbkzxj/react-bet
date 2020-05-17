package com.xbethub.webview.ui.match.items.viewHolders

import android.view.View
import androidx.lifecycle.LifecycleOwner
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.ui.match.MatchViewModel
import com.xbethub.webview.ui.match.items.ItemListener
import com.xbethub.webview.ui.match.items.items.Item

open class BaseViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {

    open fun setViewModel(viewModel: MatchViewModel, viewLifecycleOwner: LifecycleOwner) {}

    open fun setItem(item: Item) {}

    open fun setListener(listener: ItemListener) {}
}
