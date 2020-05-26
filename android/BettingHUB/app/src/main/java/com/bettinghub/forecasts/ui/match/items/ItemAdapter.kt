package com.bettinghub.forecasts.ui.match.items

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.lifecycle.LifecycleOwner
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.ui.RecyclerViewAdapterBase
import com.bettinghub.forecasts.ui.match.MatchViewModel
import com.bettinghub.forecasts.ui.match.items.items.HeaderItem
import com.bettinghub.forecasts.ui.match.items.items.Item
import com.bettinghub.forecasts.ui.match.items.items.ItemType
import com.bettinghub.forecasts.ui.match.items.items.ShowMoreItem
import com.bettinghub.forecasts.ui.match.items.viewHolders.*

class ItemAdapter(listener: ItemListener, private val viewModel: MatchViewModel, private val lifecycleOwner: LifecycleOwner)
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
            is ForecasterTableLineViewHolder -> holder.setItem(model)
        }
    }

    override fun getItemViewType(position: Int): Int {
        return getItem(position).getType().ordinal
    }

    override fun createView(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        when (ItemType.values()[viewType]) {
            ItemType.HEADER -> return HeaderViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_match_header, parent, false))

            ItemType.FORECASTER_TABLE_HEADER -> return ForecasterTableHeaderViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_forecaster_rating_table_header, parent, false))

            ItemType.FORECASTER_TABLE_LINE -> return ForecasterTableLineViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_forecaster_rating_line, parent, false))

            ItemType.COMMENT_L0 -> return CommentViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_comment_0_level, parent, false))

            ItemType.COMMENT_L1 -> return CommentL1ViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_comment_1_level, parent, false))

            ItemType.COMMENT_L2 -> return CommentL2ViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_comment_2_level, parent, false))

            ItemType.COMMENT_L3 -> return CommentL3ViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_comment_3_level, parent, false))

            ItemType.FOOTER -> return FooterViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_footer, parent, false))

            ItemType.NEW_COMMENT -> return NewCommentViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_comment_new, parent, false))

            else -> return ShowMoreViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_comment_show_more, parent, false))
        }
    }

}
