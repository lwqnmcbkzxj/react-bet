package com.xbethub.webview.ui.news.items.viewHolders

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.xbethub.webview.databinding.ItemNewsBinding
import com.xbethub.webview.models.News
import com.xbethub.webview.ui.news.items.NewsListener
import com.xbethub.webview.ui.news.items.items.NewsItem

class NewsViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
    val binding = ItemNewsBinding.bind(itemView)
    var news: News? = null

    fun setNewsItem(newsItem: NewsItem) {
        news = newsItem.news

        news?.let {
            binding.loading.root.visibility = View.GONE
            binding.main.visibility = View.VISIBLE
        } ?: run {
            binding.main.visibility = View.GONE
            binding.loading.root.visibility = View.VISIBLE
        }
    }

    fun setListener(newsListener: NewsListener) {
        binding.main.setOnClickListener {
            news?.let {
                newsListener.onNewsClick(it, adapterPosition)
            }
        }
    }
}
