package com.bettinghub.forecasts.ui.news.items.viewHolders

import android.annotation.SuppressLint
import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.databinding.ItemNewsBinding
import com.bettinghub.forecasts.models.News
import com.bettinghub.forecasts.ui.news.items.NewsListener
import com.bettinghub.forecasts.ui.news.items.items.NewsItem
import java.text.SimpleDateFormat

class NewsViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
    val binding = ItemNewsBinding.bind(itemView)
    var news: News? = null

    @SuppressLint("SimpleDateFormat")
    val serverDateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS")
    @SuppressLint("SimpleDateFormat")
    val dateFormat = SimpleDateFormat("dd.MM.yyyy в HH:mm")

    fun setNewsItem(newsItem: NewsItem) {
        news = newsItem.news

        news?.let {
            binding.category.text = it.categoryName
            binding.dateAndTime.text = dateFormat.format(serverDateFormat.parse(it.createdAt)!!)
            binding.title.text = it.title
            binding.text.text = it.content

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
