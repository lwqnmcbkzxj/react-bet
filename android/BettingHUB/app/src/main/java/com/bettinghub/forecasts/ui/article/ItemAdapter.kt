package com.bettinghub.forecasts.ui.article

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.lifecycle.LifecycleOwner
import androidx.navigation.NavController
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.ui.RecyclerViewAdapterBase
import com.bettinghub.forecasts.ui.article.items.*
import com.bettinghub.forecasts.ui.article.viewHolders.*

class ItemAdapter(listener: ItemListener, private val viewModel: ArticleViewModel, private val lifecycleOwner: LifecycleOwner, private val navController: NavController)
    : RecyclerViewAdapterBase<ItemListener, Item, RecyclerView.ViewHolder>(listener) {

    override fun setListener(holder: RecyclerView.ViewHolder, listener: ItemListener) {
        when (holder) {
            is ShowMoreViewHolder -> holder.setListener(listener)
            is NewCommentViewHolder -> holder.setListener(listener)
            is CommentViewHolder -> holder.setListener(listener)
        }
    }

    override fun setModel(holder: RecyclerView.ViewHolder, model: Item) {
        when (holder) {
            is ShowMoreViewHolder -> holder.showMoreItem = model as ShowMoreItem
            is HeaderViewHolder -> holder.setHeaderItem(model as HeaderItem)
            is CommentViewHolder -> holder.setCommentItem(model as CommentItem)
        }
    }

    override fun getItemViewType(position: Int): Int {
        return getItem(position).getType().ordinal
    }

    override fun createView(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        when (ItemType.values()[viewType]) {
            ItemType.HEADER -> return HeaderViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.article_list_item_header, parent, false), navController)

            ItemType.COMMENT_L0 -> return CommentViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_comment_0_level, parent, false), navController)

            ItemType.COMMENT_L1 -> return CommentL1ViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_comment_1_level, parent, false), navController)

            ItemType.COMMENT_L2 -> return CommentL2ViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_comment_2_level, parent, false), navController)

            ItemType.COMMENT_L3 -> return CommentL3ViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_comment_3_level, parent, false), navController)

            ItemType.FOOTER -> return FooterViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_footer, parent, false))

            ItemType.NEW_COMMENT -> return NewCommentViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_comment_new, parent, false))

            else -> return ShowMoreViewHolder(LayoutInflater.from(parent.context)
                .inflate(R.layout.item_comment_show_more, parent, false))
        }
    }

}
