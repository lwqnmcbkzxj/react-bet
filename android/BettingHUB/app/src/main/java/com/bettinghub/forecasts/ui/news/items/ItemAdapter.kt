package com.bettinghub.forecasts.ui.news.items

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.ui.RecyclerViewAdapterBase
import com.bettinghub.forecasts.ui.news.NewsViewModel
import com.bettinghub.forecasts.ui.news.items.items.Item
import com.bettinghub.forecasts.ui.news.items.items.ItemType
import com.bettinghub.forecasts.ui.news.items.items.NewsItem
import com.bettinghub.forecasts.ui.news.items.viewHolders.FooterViewHolder
import com.bettinghub.forecasts.ui.news.items.viewHolders.HeaderViewHolder
import com.bettinghub.forecasts.ui.news.items.viewHolders.NewsViewHolder
import com.bettinghub.forecasts.ui.news.items.viewHolders.ShowMoreViewHolder

class ItemAdapter(newsListener: NewsListener, private val viewModel: NewsViewModel?)
    : RecyclerViewAdapterBase<NewsListener, Item, RecyclerView.ViewHolder>(newsListener) {

    override fun setListener(holder: RecyclerView.ViewHolder, listener: NewsListener) {
        when (holder) {
            is ShowMoreViewHolder -> holder.setViewModel(viewModel!!)
            is NewsViewHolder -> holder.setListener(listener)
        }
    }

    override fun setModel(holder: RecyclerView.ViewHolder, model: Item) {
        (holder as? NewsViewHolder)?.let {
            it.setNewsItem(model as NewsItem)
        }
    }

    override fun getItemViewType(position: Int): Int {
        return getItem(position).getType().ordinal
    }

    override fun createView(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        when (ItemType.values()[viewType]) {
            ItemType.HEADER -> return HeaderViewHolder(LayoutInflater.from(parent.context)
                                    .inflate(R.layout.item_news_header, parent, false)
                                )

            ItemType.FOOTER -> return FooterViewHolder(LayoutInflater.from(parent.context)
                                    .inflate(R.layout.item_footer, parent, false)
                                )

            ItemType.SHOW_MORE -> return ShowMoreViewHolder(LayoutInflater.from(parent.context)
                                    .inflate(R.layout.item_forecasts_show_more_btn, parent, false)
                                )

            else-> return NewsViewHolder(LayoutInflater.from(parent.context)
                                    .inflate(R.layout.item_news, parent, false)
                                )
        }
    }
}
