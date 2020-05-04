package com.xbethub.webview.ui.forecasterRating.items

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.lifecycle.LifecycleOwner
import com.xbethub.webview.R
import com.xbethub.webview.ui.RecyclerViewAdapterBase
import com.xbethub.webview.ui.forecasterRating.ForecasterRatingViewModel
import com.xbethub.webview.ui.forecasterRating.items.items.Item
import com.xbethub.webview.ui.forecasterRating.items.items.ItemType
import com.xbethub.webview.ui.forecasterRating.items.viewHolders.*

class ItemAdapter(listener: ItemListener, val viewModel: ForecasterRatingViewModel, val viewLifecycleOwner: LifecycleOwner)
    : RecyclerViewAdapterBase<ItemListener, Item, BaseViewHolder>(listener) {

    override fun setListener(holder: BaseViewHolder, listener: ItemListener) {
        holder.setListener(listener)
        holder.setViewModel(viewModel, viewLifecycleOwner)
    }

    override fun setModel(holder: BaseViewHolder, model: Item) {
        holder.setItem(model)
    }

    override fun getItemViewType(position: Int): Int {
        return getItem(position).getType().ordinal
    }

    override fun createView(parent: ViewGroup, viewType: Int): BaseViewHolder {
        when (ItemType.values()[viewType]) {
            ItemType.HEADER -> return HeaderViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_forecaster_rating_header, parent, false))

            ItemType.TABLE_HEADER -> return TableHeaderViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_forecaster_rating_table_header, parent, false))

            ItemType.FOOTER -> return FooterViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_footer, parent, false))

            else -> return TableLineViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_forecaster_rating_line, parent, false))
        }
    }
}
