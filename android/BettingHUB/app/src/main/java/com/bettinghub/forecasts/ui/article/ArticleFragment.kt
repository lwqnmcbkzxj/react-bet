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
import androidx.core.text.HtmlCompat
import androidx.fragment.app.viewModels
import androidx.lifecycle.Observer
import androidx.navigation.fragment.findNavController
import androidx.navigation.fragment.navArgs
import androidx.recyclerview.widget.LinearLayoutManager
import com.bettinghub.forecasts.App
import com.bettinghub.forecasts.backend.BettingHubBackend
import com.bettinghub.forecasts.enums.Status
import com.bettinghub.forecasts.models.Comment
import com.bettinghub.forecasts.ui.article.items.*
import com.bettinghub.forecasts.ui.forecast.items.viewHolders.*
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import kotlinx.android.synthetic.main.article_list_item.view.title
import kotlinx.android.synthetic.main.article_list_item_header.view.*
import kotlinx.android.synthetic.main.article_list_item_header.view.downVoteButton
import kotlinx.android.synthetic.main.article_list_item_header.view.imageView
import kotlinx.android.synthetic.main.article_list_item_header.view.likeCount
import kotlinx.android.synthetic.main.article_list_item_header.view.recommendations
import kotlinx.android.synthetic.main.article_list_item_header.view.upVoteButton
import java.text.SimpleDateFormat
import kotlin.math.max
import kotlin.math.min
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
    lateinit var adapter: ItemAdapter

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
        val topSpace = resources.getDimensionPixelSize(R.dimen.commentItemTopSpace)
        val sideSpace = resources.getDimensionPixelSize(R.dimen.commentItemSideSpace)
        val itemSpace = resources.getDimensionPixelSize(R.dimen.commentItemSpace)
        //val showMoreTopSpace = resources.getDimensionPixelSize(R.dimen.forecastsShowMoreTopSpace)
        val footerTopSpace = resources.getDimensionPixelSize(R.dimen.forecastsFooterTopSpace)
        val bottomSpace = resources.getDimensionPixelSize(R.dimen.footerBottomMargin)

        recyclerView.addItemDecoration(
            ItemDecoration(
                topSpace
                , sideSpace
                , itemSpace
                , footerTopSpace
                , bottomSpace
            )
        )
        adapter = ItemAdapter(viewModel, viewModel, this, findNavController())
        recyclerView.adapter = adapter
        val items = ArrayList<Item>()
        items.add(NewCommentItem())
        items.add(FooterItem())
        adapter.addAll(items)
        viewModel.article.observe(viewLifecycleOwner, Observer {
            if (it.status == Status.SUCCESS) {
                adapter.insertItem(0, HeaderItem(it.data!!))
            }
        })
        viewModel.commentsLiveData.observe(viewLifecycleOwner, Observer {
            if (it.status == Status.SUCCESS) {
                addNewComments(it.data!!.first, it.data.second)
            }
        })
//        viewModel.articles.observe(viewLifecycleOwner, Observer {
//            articles = it.data
//            if (it.status == Status.SUCCESS) {
//                recyclerView.adapter = Adapter(article!!, it.data!!.filter { it.id != article!!.id }.take(3))
//            }
//        })
        viewModel.id.value = args.articleId
    }

    private fun addNewComments(position: Int, comments: List<Item>) {
        (recyclerView.adapter as ItemAdapter).let {
            val insertPos = if (position == -1) max(it.itemCount - 2, 0) else position

            (recyclerView.adapter as ItemAdapter).let {
                it.addAll(insertPos, comments)

                if (position != -1) {
                    it.removeItem(position + comments.size)
                }
            }
        }
    }

    fun getCommentCount(comments: List<Comment>, id: Int?): Int {
        var count = 1
        comments.forEach {
            if (it.repliesTo == id) {
                count += getCommentCount(comments, it.id)
            }
        }
        return count
    }

    private fun addComment(comment: Comment) {
        (recyclerView.adapter as ItemAdapter).let { adapter ->
            if (comment.repliesTo == null) {
                adapter.insertItem(adapter.itemCount - 2, CommentItem(0, comment))
            } else {
                val items = adapter.getItems()
                val comments = items.asSequence().filter { it.getType().ordinal in 0..3 }
                    .map { (it as CommentItem).comment }.toList()

                items.indexOfFirst {
                    val item = it as? CommentItem
                    item?.comment?.id == comment.repliesTo && item.level < 3
                }.let { parentCommentIndex ->
                    if (parentCommentIndex != -1) {
                        val parentComment = items[parentCommentIndex] as CommentItem
                        val position = parentCommentIndex + getCommentCount(comments, parentComment.comment.id)
                        adapter.insertItem(
                            position,
                            CommentItem(parentComment.level + 1, comment)
                        )
                        (recyclerView.layoutManager as LinearLayoutManager).scrollToPosition(
                            position
                        )
                    }
                }
            }
        }
    }
}
