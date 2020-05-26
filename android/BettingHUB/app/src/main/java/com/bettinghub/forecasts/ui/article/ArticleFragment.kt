package com.bettinghub.forecasts.ui.article

import android.annotation.SuppressLint
import android.graphics.Rect
import android.os.Bundle
import android.view.*
import android.widget.Button
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.RecyclerView
import com.bettinghub.forecasts.R
import com.bettinghub.forecasts.Utils
import com.bettinghub.forecasts.models.Article
import kotlinx.android.synthetic.main.article_list_item.view.*
import kotlinx.android.synthetic.main.element_top_panel.*
import kotlinx.android.synthetic.main.element_top_panel.view.*
import kotlinx.android.synthetic.main.fragment_article.*
import androidx.core.content.ContextCompat
import androidx.fragment.app.viewModels
import androidx.lifecycle.Observer
import androidx.navigation.fragment.navArgs
import kotlinx.android.synthetic.main.article_list_item.view.title
import kotlinx.android.synthetic.main.article_list_item_header.view.*
import kotlinx.android.synthetic.main.article_list_item_header.view.downVoteButton
import kotlinx.android.synthetic.main.article_list_item_header.view.imageView
import kotlinx.android.synthetic.main.article_list_item_header.view.likeCount
import kotlinx.android.synthetic.main.article_list_item_header.view.recommendations
import kotlinx.android.synthetic.main.article_list_item_header.view.upVoteButton
import java.text.SimpleDateFormat
import kotlin.math.roundToInt

class ArticleFragment : Fragment() {

    companion object {

        private const val ITEM_VIEW_TYPE_HEADER = 0
        private const val ITEM_VIEW_TYPE_COMMENT_L0 = 1
        private const val ITEM_VIEW_TYPE_COMMENT_L1 = 2
        private const val ITEM_VIEW_TYPE_COMMENT_L2 = 3
        private const val ITEM_VIEW_TYPE_COMMENT_L3 = 4
        private const val ITEM_VIEW_TYPE_NEW_COMMENT = 5
        private const val ITEM_VIEW_TYPE_EMPTY_COMMENTS = 6
        private const val ITEM_VIEW_TYPE_ARTICLE = 7
        private const val ITEM_VIEW_TYPE_FOOTER = 8
        private const val ITEM_VIEW_TYPE_SIMILAR_ARTICLES = 9
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? = inflater.inflate(R.layout.fragment_article, container, false)

    val viewModel by viewModels<ArticleViewModel>()
    val args by navArgs<ArticleFragmentArgs>()

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        backBtn.setOnClickListener {
            activity?.onBackPressed()
        }
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
        var article: Article? = null
        var articles: List<Article>? = null
        viewModel.article.observe(viewLifecycleOwner, Observer {
            article = it.data
            if (articles != null) {
                recyclerView.adapter = Adapter(it.data ?: return@Observer, articles!!)
            }
        })
        viewModel.articles.observe(viewLifecycleOwner, Observer {
            articles = it.data?.take(3)
            if (article != null) {
                recyclerView.adapter = Adapter(article!!, it.data ?: emptyList())
            }
        })
        viewModel.id.value = args.articleId
        recyclerView.addItemDecoration(object : RecyclerView.ItemDecoration() {

            override fun getItemOffsets(
                outRect: Rect,
                view: View,
                parent: RecyclerView,
                state: RecyclerView.State
            ) {
                (parent.adapter as? Adapter)?.getItemViewType(parent.getChildAdapterPosition(view))?.let {
                    when (it) {
//                        ITEM_VIEW_TYPE_ARTICLE -> {
//                            outRect.left = (resources.displayMetrics.density * 16).roundToInt()
//                            outRect.right = (resources.displayMetrics.density * 16).roundToInt()
//
//                            outRect.top = (resources.displayMetrics.density * 10).roundToInt()
//                            outRect.bottom = (resources.displayMetrics.density * 10).roundToInt()
//                        }
                        ITEM_VIEW_TYPE_NEW_COMMENT -> {
                            outRect.top = (resources.displayMetrics.density * 12).roundToInt()
                            outRect.bottom = (resources.displayMetrics.density * 24).roundToInt()
                        }
                        ITEM_VIEW_TYPE_EMPTY_COMMENTS -> {
                            outRect.top = (resources.displayMetrics.density * 12).roundToInt()
                            outRect.bottom = (resources.displayMetrics.density * 2).roundToInt()
                        }
                        ITEM_VIEW_TYPE_ARTICLE -> {
                            outRect.left = (resources.displayMetrics.density * 16).roundToInt()
                            outRect.right = (resources.displayMetrics.density * 16).roundToInt()

                            outRect.top = (resources.displayMetrics.density * 10).roundToInt()
                            outRect.bottom = (resources.displayMetrics.density * 10).roundToInt()
                        }
                        ITEM_VIEW_TYPE_HEADER -> {
                            outRect.left = (resources.displayMetrics.density * 16).roundToInt()
                            outRect.right = (resources.displayMetrics.density * 16).roundToInt()
                        }
                        ITEM_VIEW_TYPE_SIMILAR_ARTICLES -> {
                            outRect.left = (resources.displayMetrics.density * 16).roundToInt()
                            outRect.right = (resources.displayMetrics.density * 16).roundToInt()

                            outRect.top = (resources.displayMetrics.density * 24).roundToInt()
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

    private inner class Adapter(val article: Article, val articles: List<Article>) :
        RecyclerView.Adapter<RecyclerView.ViewHolder>() {

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) = when(viewType) {
            ITEM_VIEW_TYPE_HEADER -> HeaderViewHolder(LayoutInflater.from(requireContext()).inflate(R.layout.article_list_item_header, parent, false))
//            ITEM_VIEW_TYPE_EMPTY_COMMENTS -> object : RecyclerView.ViewHolder(layoutInflater.inflate(R.layout.item_empty_comments, parent, false)) {}
//            ITEM_VIEW_TYPE_NEW_COMMENT -> object : RecyclerView.ViewHolder(layoutInflater.inflate(R.layout.item_comment_new, parent, false)) {}
            ITEM_VIEW_TYPE_ARTICLE -> ArticleViewHolder(layoutInflater.inflate(R.layout.article_list_item, parent, false))
            ITEM_VIEW_TYPE_SIMILAR_ARTICLES -> object : RecyclerView.ViewHolder(TextView(parent.context).apply {
                text = "Похожие статьи:"
                setTextColor(ContextCompat.getColor(requireContext(), R.color.textColor1))
                textSize = 18f
            }) {}
//            ITEM_VIEW_TYPE_NEW_COMMENT -> object : RecyclerView.ViewHolder(layoutInflater.inflate(R.layout.item_comment_new, parent, false)) {}
//            ITEM_VIEW_TYPE_COMMENT_L0 -> object : RecyclerView.ViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.item_comment_0_level, parent, false)) {}
//
//            ITEM_VIEW_TYPE_COMMENT_L1 -> object : RecyclerView.ViewHolder(LayoutInflater.from(parent.context)
//                .inflate(R.layout.item_comment_1_level, parent, false)) {}
//
//            ITEM_VIEW_TYPE_COMMENT_L2 -> object : RecyclerView.ViewHolder(LayoutInflater.from(parent.context)
//                .inflate(R.layout.item_comment_2_level, parent, false)) {}
//
//            ITEM_VIEW_TYPE_COMMENT_L3 -> object : RecyclerView.ViewHolder(LayoutInflater.from(parent.context)
//                .inflate(R.layout.item_comment_3_level, parent, false)) {}
            else -> object : RecyclerView.ViewHolder(layoutInflater.inflate(R.layout.item_footer, parent, false)) {}
        }

        override fun getItemViewType(position: Int) = when (position) {
            0 -> ITEM_VIEW_TYPE_HEADER
//            1 -> ITEM_VIEW_TYPE_EMPTY_COMMENTS
//            2 -> ITEM_VIEW_TYPE_NEW_COMMENT
            1 -> ITEM_VIEW_TYPE_SIMILAR_ARTICLES
            itemCount - 1 -> ITEM_VIEW_TYPE_FOOTER
            else -> ITEM_VIEW_TYPE_ARTICLE
        }

        override fun getItemCount() = articles.size + 3

        override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
            when(getItemViewType(position)) {
                ITEM_VIEW_TYPE_HEADER -> (holder as? HeaderViewHolder)?.bind(article)
                ITEM_VIEW_TYPE_ARTICLE -> (holder as? ArticleViewHolder)?.bind(articles[position - 2])
//                ITEM_VIEW_TYPE_SHOW_MORE -> (holder as? ShowMoreViewHolder)?.bind()
            }
        }
    }

    private class HeaderViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        val imageView = itemView.imageView!!
        val recommendations = itemView.recommendations!!
        val commentCount = itemView.commentCount1!!
        val likeCount = itemView.likeCount!!
        val downVoteButton = itemView.downVoteButton!!
        val upVoteButton = itemView.upVoteButton!!
        val title = itemView.title!!

        fun bind(article: Article) {
            recommendations.text = article.content
            commentCount.text = article.commentCount.toString()
            likeCount.text = article.rating.toString()
            title.text = article.title
            downVoteButton.setOnClickListener {

            }
            upVoteButton.setOnClickListener {

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
            recommendations.text = article.content
            commentCount.text = article.commentCount.toString()
            likeCount.text = article.rating.toString()
            title.text = article.title
            time.text = dateFormat.format(serverDateFormat.parse(article.createdAt)!!)
            downVoteButton.setOnClickListener {

            }
            upVoteButton.setOnClickListener {

            }
            itemView.setOnClickListener {
//                findNavController().navigate(ArticlesFragmentDirections.toArticleFragment())
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
