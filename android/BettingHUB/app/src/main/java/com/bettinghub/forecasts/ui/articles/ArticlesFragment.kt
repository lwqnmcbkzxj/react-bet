package com.bettinghub.forecasts.ui.articles

import android.annotation.SuppressLint
import android.graphics.Rect
import android.os.Bundle
import android.view.ContextThemeWrapper
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.Gravity
import android.widget.Button
import android.widget.TextView
import androidx.core.text.HtmlCompat
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.Observer
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.App
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.Utils
import com.bettinghub.forecasts.backend.BettingHubBackend
import com.bettinghub.forecasts.models.Article
import com.bettinghub.forecasts.ui.LoginFragmentDirections
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import kotlinx.android.synthetic.main.article_list_item.view.*
import kotlinx.android.synthetic.main.element_top_panel.*
import kotlinx.android.synthetic.main.element_top_panel.view.*
import kotlinx.android.synthetic.main.fragment_articles.*
import java.text.SimpleDateFormat
import kotlin.math.roundToInt

class ArticlesFragment : Fragment() {

    companion object {

        private const val ITEM_VIEW_TYPE_TITLE = 0
        private const val ITEM_VIEW_TYPE_ARTICLE = 1
        private const val ITEM_VIEW_TYPE_SHOW_MORE = 2
        private const val ITEM_VIEW_TYPE_FOOTER = 3
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? = inflater.inflate(R.layout.fragment_articles, container, false)

    val viewModel by viewModels<ArticlesViewModel>()

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        searchField.visibility = View.GONE
        topPanel.searchBtn.setOnClickListener {
            searchField.visibility = if (searchField.visibility == View.GONE) {
                searchField.requestFocus()
                Utils.showKeyboard(requireContext())
                View.VISIBLE
            } else {
                View.GONE
            }
        }
        viewModel.articles.observe(viewLifecycleOwner, Observer {
            articleRecyclerView.adapter = ArticleAdapter(it.data ?: emptyList())
        })
        articleRecyclerView.addItemDecoration(object : RecyclerView.ItemDecoration() {

            override fun getItemOffsets(
                outRect: Rect,
                view: View,
                parent: RecyclerView,
                state: RecyclerView.State
            ) {
                (parent.adapter as? ArticleAdapter)?.getItemViewType(parent.getChildAdapterPosition(view))?.let {
                    when (it) {
                        ITEM_VIEW_TYPE_TITLE -> {
                            outRect.top = (resources.displayMetrics.density * 26).roundToInt()
                            outRect.bottom = (resources.displayMetrics.density * 26).roundToInt()
                        }
                        ITEM_VIEW_TYPE_ARTICLE -> {
                            outRect.left = (resources.displayMetrics.density * 16).roundToInt()
                            outRect.right = (resources.displayMetrics.density * 16).roundToInt()

                            outRect.top = (resources.displayMetrics.density * 10).roundToInt()
                            outRect.bottom = (resources.displayMetrics.density * 10).roundToInt()
                        }
                        ITEM_VIEW_TYPE_SHOW_MORE -> {
                            outRect.top = (resources.displayMetrics.density * 24).roundToInt()
                            outRect.bottom = (resources.displayMetrics.density * 24).roundToInt()
                        }
                        ITEM_VIEW_TYPE_FOOTER -> {
                            outRect.top = (resources.displayMetrics.density * 10).roundToInt()
                            outRect.bottom = (resources.displayMetrics.density * 70).roundToInt()
                        }
                    }
                }
            }
        })
    }

    private inner class ArticleAdapter(val articles: List<Article>) :
        RecyclerView.Adapter<RecyclerView.ViewHolder>() {

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) = when(viewType) {
            ITEM_VIEW_TYPE_TITLE -> object : RecyclerView.ViewHolder(TextView(ContextThemeWrapper(parent.context, R.style.TittleStyle)).apply {
                text = getString(R.string.articles_title)
                gravity = Gravity.CENTER
                layoutParams = RecyclerView.LayoutParams(RecyclerView.LayoutParams.MATCH_PARENT, RecyclerView.LayoutParams.WRAP_CONTENT)
            }) {}
            ITEM_VIEW_TYPE_SHOW_MORE -> ShowMoreViewHolder(layoutInflater.inflate(R.layout.item_forecasts_show_more_btn, parent, false) as Button)
            ITEM_VIEW_TYPE_FOOTER -> object : RecyclerView.ViewHolder(layoutInflater.inflate(R.layout.item_footer, parent, false)) {}
            else -> ArticleViewHolder(layoutInflater.inflate(R.layout.article_list_item, parent, false))
        }

        override fun getItemViewType(position: Int) = when (position) {
            0 -> ITEM_VIEW_TYPE_TITLE
            itemCount - 2 -> ITEM_VIEW_TYPE_SHOW_MORE
            itemCount - 1 -> ITEM_VIEW_TYPE_FOOTER
            else -> ITEM_VIEW_TYPE_ARTICLE
        }

        override fun getItemCount() = articles.size + 3

        override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
            when(getItemViewType(position)) {
                ITEM_VIEW_TYPE_ARTICLE -> (holder as? ArticleViewHolder)?.bind(articles[position - 1])
                ITEM_VIEW_TYPE_SHOW_MORE -> (holder as? ShowMoreViewHolder)?.bind()
            }
        }
    }

    private inner class ArticleViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        val imageView = itemView.imageView!!
        val time = itemView.time!!
        val categoryName = itemView.categoryName!!
        val recommendations = itemView.recommendations!!
        val commentCount = itemView.commentCount!!
        val likeCount = itemView.likeCount!!
        val downVoteButton = itemView.downVoteButton!!
        val upVoteButton = itemView.upVoteButton!!
        val title = itemView.title!!

        @SuppressLint("SimpleDateFormat")
        val serverDateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS")
        @SuppressLint("SimpleDateFormat")
        val dateFormat = SimpleDateFormat("dd.MM.yyyy в HH:mm")

        fun bind(article: Article) {
            categoryName.text = article.categoryName
            recommendations.text = HtmlCompat.fromHtml(article.content, HtmlCompat.FROM_HTML_MODE_COMPACT)
            commentCount.text = article.commentCount.toString()
            likeCount.text = article.rating.toString()
            title.text = article.title
            time.text = dateFormat.format(serverDateFormat.parse(article.createdAt)!!)
            var liked = false
            var disliked = false
            downVoteButton.setOnClickListener {
                if (App.appComponent.getAppData().activeUser == null) {
                    findNavController().navigate(LoginFragmentDirections.actionGlobalLoginFragment(R.id.profileFragment))
                    return@setOnClickListener
                }
                BettingHubBackend().api.dislikeArticle(article.id, "Bearer ${App.appComponent.getAppData().activeUser?.accessToken}")
                    .subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe({
                        if (it.isSuccessful) {
                            if (!disliked) {
                                article.rating--
                                if (liked) {
                                    article.rating--
                                    liked = false
                                }
                            } else {
                                article.rating++
                            }
                            likeCount.text = article.rating.toString()
                            disliked = !disliked
                        }
                    }, {
                        it.printStackTrace()
                    })
            }
            upVoteButton.setOnClickListener {
                if (App.appComponent.getAppData().activeUser == null) {
                    findNavController().navigate(LoginFragmentDirections.actionGlobalLoginFragment(R.id.profileFragment))
                    return@setOnClickListener
                }
                BettingHubBackend().api.likeArticle(article.id, "Bearer ${App.appComponent.getAppData().activeUser?.accessToken}")
                    .subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe({
                        if (it.isSuccessful) {
                            if (!liked) {
                                article.rating++
                                if (disliked) {
                                    article.rating++
                                    disliked = false
                                }
                            } else {
                                article.rating--
                            }
                            likeCount.text = article.rating.toString()
                            liked = !liked
                        }
                    }, {
                        it.printStackTrace()
                    })
            }
            itemView.setOnClickListener {
                findNavController().navigate(ArticlesFragmentDirections.toArticleFragment(article.id))
            }
        }
    }

    private inner class ShowMoreViewHolder(val button: Button) : RecyclerView.ViewHolder(button) {

        fun bind() {
            button.setOnClickListener {

            }
        }
    }
}
