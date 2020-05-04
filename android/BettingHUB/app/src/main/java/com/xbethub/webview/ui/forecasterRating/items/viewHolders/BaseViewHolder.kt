package com.xbethub.webview.ui.forecasterRating.items.viewHolders

import android.view.View
import androidx.lifecycle.LifecycleOwner
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.ui.forecasterRating.ForecasterRatingViewModel
import com.xbethub.webview.ui.forecasterRating.items.ItemListener
import com.xbethub.webview.ui.forecasterRating.items.items.Item

open class BaseViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {

    open fun setViewModel(viewModel: ForecasterRatingViewModel, viewLifecycleOwner: LifecycleOwner) {}

    open fun setItem(item: Item) {}

    open fun setListener(listener: ItemListener) {}
}
