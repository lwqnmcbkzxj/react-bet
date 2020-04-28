package com.xbethub.webview.ui.forecast.items

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.lifecycle.LifecycleOwner
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.R
import com.xbethub.webview.ui.RecyclerViewAdapterBase
import com.xbethub.webview.ui.forecast.ForecastViewModel
import com.xbethub.webview.ui.forecast.items.items.HeaderItem
import com.xbethub.webview.ui.forecast.items.items.Item
import com.xbethub.webview.ui.forecast.items.items.ItemType
import com.xbethub.webview.ui.forecast.items.items.ShowMoreItem
import com.xbethub.webview.ui.forecast.items.viewHolders.*

class ItemAdapter(listener: ItemListener, private val viewModel: ForecastViewModel, private val lifecycleOwner: LifecycleOwner)
    : RecyclerViewAdapterBase<ItemListener, Item, RecyclerView.ViewHolder>(listener) {

    override fun setListener(holder: RecyclerView.ViewHolder, listener: ItemListener) {
        when (holder) {
            is ShowMoreViewHolder -> holder.setListener(listener)
            is NewCommentViewHolder -> holder.setListener(listener)
        }
    }

    override fun setModel(holder: RecyclerView.ViewHolder, model: Item) {
        when (holder) {
            is ShowMoreViewHolder -> holder.showMoreItem = model as ShowMoreItem
            is HeaderViewHolder -> holder.setHeaderItem(model as HeaderItem)
        }
    }

    override fun getItemViewType(position: Int): Int {
        return getItem(position).getType().ordinal
    }

    override fun createView(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        when (ItemType.values()[viewType]) {
            ItemType.HEADER -> return HeaderViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_forecast_header, parent, false))

            ItemType.COMMENT_L0 -> return CommentViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_comment_0_level, parent, false))

            ItemType.COMMENT_L1 -> return CommentL1ViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_comment_1_level, parent, false))

            ItemType.COMMENT_L2 -> return CommentL2ViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_comment_2_level, parent, false))

            ItemType.COMMENT_L3 -> return CommentL3ViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_comment_3_level, parent, false))

            ItemType.FOOTER -> return FooterViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_forecasts_footer, parent, false))

            ItemType.NEW_COMMENT -> return NewCommentViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_comment_new, parent, false))

            else -> return ShowMoreViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_comment_show_more, parent, false))
        }
    }

}
