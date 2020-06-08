package com.bettinghub.forecasts.ui.article

import androidx.lifecycle.MediatorLiveData
import androidx.lifecycle.MutableLiveData
import com.bettinghub.forecasts.BaseViewModel
import com.bettinghub.forecasts.Event
import com.bettinghub.forecasts.models.Article
import com.bettinghub.forecasts.models.Comment
import com.bettinghub.forecasts.models.User
import com.bettinghub.forecasts.ui.article.items.CommentItem
import com.bettinghub.forecasts.ui.article.items.Item
import com.bettinghub.forecasts.ui.article.items.ShowMoreItem

class ArticleViewModel: BaseViewModel(), ItemListener {

    val id = MutableLiveData<Int>()
    val article = MediatorLiveData<Event<Article>>()
    val articles = MediatorLiveData<Event<List<Article>>>()
    val commentsLiveData = MutableLiveData<Event<Pair<Int, List<Item>>>>()
    val commentAdded = MutableLiveData<Event<Comment>>()

    init {
        article.addSource(id) { id ->
            requestWithLiveData(article
                , { backendAPI.article(id) }
                , {

                    it
                }
            )
            requestWithLiveData(commentsLiveData
                , { backendAPI.articleComments("Bearer ${appData.activeUser?.accessToken}", id) }
                , {
                    Pair(-1, getComments(it))
                }
            )
        }
//        appData.articles?.let {
//            articles.value = Event.success(appData.articles)
//        } ?: run {
//            requestWithLiveData(articles
//                , { backendAPI.articles() }
//                , {
//                    appData.articles = it.data
//                    it.data
//                }
//            )
//        }

    }

    fun getComments(
        allComments: List<Comment>,
        repliesTo: Int? = null,
        level: Int = 0
    ): List<CommentItem> {
        return allComments.filter { it.repliesTo == repliesTo }.let {
            val comments = mutableListOf<CommentItem>()
            it.forEach { comment ->
                comments.add(CommentItem(level, comment))
                if (level < 3) {
                    comments.addAll(getComments(allComments, comment.id, level + 1))
                }
            }
            comments
        }
    }

    override fun onShowMoreBtnClick(showMoreItem: ShowMoreItem, position: Int) {

    }

    override fun onAddComment(text: String, repliesTo: Int?, successCallback: (() -> Unit)?) {
        requestWithLiveData(commentAdded, {
            backendAPI.articleComment("Bearer ${appData.activeUser?.accessToken}", id.value!!, mapOf("text" to text, "replies_to" to repliesTo?.toString()))
        }, {
            successCallback?.invoke()
            it
        })
    }

}
